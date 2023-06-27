import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// async function createInBatches(items, batchSize, createFunc) {
//   for (let i = 0; i < items.length; i += batchSize) {
//     const batch = items.slice(i, i + batchSize);
//     await Promise.all(batch.map(createFunc));
//   }
// }

/**
 * Create records in the database in batches.
 * @param {Prisma.Model} model - The Prisma model for the record type.
 * @param {Array} items - The items to create.
 * @param {number} batchSize - The size of each batch.
 * @param {function} operation - The function to run for each item.
 * @returns {Promise} A promise that resolves when all records have been created.
 */
// async function createInBatches(model, items, batchSize, operation) {
//   const total = items.length;
//   let processed = 0;

//   while (processed < total) {
//     const batchItems = items.slice(processed, processed + batchSize);
//     const promises = batchItems.map(item => operation(model, item));
//     await Promise.all(promises);
//     processed += batchSize;
//   }
// }
async function createInBatches(model, items, batchSize, operation) {
  const total = items.length;
  let processed = 0;

  while (processed < total) {
    const batchItems = items.slice(processed, processed + batchSize);
    for(const item of batchItems) {
      await operation(model, item);
    }
    processed += batchSize;
  }
}

async function checkExists(model, id) {
  const result = await model.findUnique({ where: { id } });
  return result !== null;
}

export const guideRouter = createTRPCRouter({
  getAllStrategicObjectives: publicProcedure.query(({ }) => {
    return prisma.strategicObjective.findMany({
      include: {
        assessmentCriterias: {
          include: {
            metrics: {
              include: {
                Input: { include: { unit: true } },
                Output: { include: { unit: true } }, // include the unit property in the output
                equation: true,
              },
            },
          },
        },
      },
    });
  }),
  getInputRating: publicProcedure.query(async ({ inputId, value }) => {
    const input = await prisma.input.findUnique({
      where: {
        id: inputId,
      },
    });

    if (!input) {
      throw new Error(`Input with ID ${inputId} not found.`);
    }
  
    if (input.min === null || input.max === null) {
      throw new Error(`Input with ID ${inputId} does not have min and max values defined.`);
    }
  
    const range = input.max - input.min;
    const firstThird = input.min + range / 3;
    const secondThird = input.min + (2 * range) / 3;
  
    if (value < firstThird) {
      return 1;
    } else if (value >= firstThird && value < secondThird) {
      return 2;
    } else {
      return 3;
    }
  }),
  
    
  submitData: protectedProcedure.input(z.object(
    {
      userId: z.string(),
      assessmentTitle: z.string(),
      assessmentDesc: z.string(),
      strategicObjectives: z.array(z.number().int()),
      assessmentCriteria: z.array(z.number().int()),
      metrics: z.array(z.number().int()),
      inputs: z.array(z.number().int()),
      inputValues: z.array(z.union([z.number(), z.undefined()])),
    })).mutation(async ({ input }) => {
      // Destructure the data from the input
      // Process the passedData and return the SubmittedDataType
      const processedData = {
        userId: input.userId,
        title: input.assessmentTitle,
        description: input.assessmentDesc,
        selectedStrategicObjectives: input.strategicObjectives,
        selectedAssessmentCriteria: input.assessmentCriteria,
        selectedMetrics: input.metrics,
        availableInputs: input.inputs,
        inputValues: input.inputValues,
      };

      try {
        // Create a new assessment
        const newAssessment = await prisma.assessment.create({
          data: {
            userId: processedData.userId,
            title: processedData.title,
            description: processedData.description
          },
        });

        // Create associated records and connect them with the newly created Assessment
        await createInBatches(prisma.strategicObjectiveOnAssessment, processedData.selectedStrategicObjectives, 10, async (model, soId) => {
          const exists = await prisma.strategicObjective.findUnique({ where: { id: soId } });
          if (exists) {
            return model.create({
              data: {
                assessment: {
                  connect: { id: newAssessment.id },
                },
                strategicObjective: {
                  connect: { id: soId },
                },
              },
            });
          }
        });

        await createInBatches(prisma.assessmentCriteriaOnAssessment, processedData.selectedAssessmentCriteria, 10, async (model, acId) => {
          const exists = await prisma.assessmentCriteria.findUnique({ where: { id: acId } });
          if (exists) {
            return model.create({
              data: {
                assessment: {
                  connect: { id: newAssessment.id },
                },
                assessmentCriteria: {
                  connect: { id: acId },
                },
              },
            });
          }
        });

        await createInBatches(prisma.metricOnAssessment, processedData.selectedMetrics, 10, async (model, metricId) => {
          const exists = await prisma.metric.findUnique({ where: { id: metricId } });
          if (exists) {
            return model.create({
              data: {
                assessment: {
                  connect: { id: newAssessment.id },
                },
                metric: {
                  connect: { id: metricId },
                },
              },
            });
          }
        });

        await createInBatches(prisma.inputOnAssessment, processedData.availableInputs, 10, async (model, inputId) => {
          const exists = await prisma.input.findUnique({ where: { id: inputId } });
          if (exists) {
            return model.create({
              data: {
                assessment: {
                  connect: { id: newAssessment.id },
                },
                input: {
                  connect: { id: inputId },
                },
              },
            });
          }
        });


        // Finally, create InputValues
        await createInBatches(prisma.inputValue, processedData.inputValues.map((value, index) => ({ value, inputId: processedData.availableInputs[index] })), 10, async (model, { value, inputId }) => {
          const exists = await prisma.input.findUnique({ where: { id: inputId } });
          if (exists) {
            return model.create({
              data: {
                InputValue: value,
                assessment: {
                  connect: { id: newAssessment.id },
                },
                input: {
                  connect: { id: inputId },
                },
              },
            });
          }
        });


        return {
          success: true,
          assessment: newAssessment,
        };
      } catch (error) {
        // Handle and log the error
        console.error('Error creating assessment:', error);
        return {
          success: false,
          error: error.message,
        };
      }
    }),
});