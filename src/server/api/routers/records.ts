import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const recordsRouter = createTRPCRouter({
  getAllassessments: protectedProcedure.query(({ }) => {
    return prisma.assessment.findMany({
      include: {
        strategicObjectives: true,
        assessmentCriterias: true,
        metrics: true,
        inputs: true,
        inputValues: true,
      },
    });
  }), 

  deleteAssessment: protectedProcedure.input(z.object({
    userId: z.string(),
    assessmentId: z.number().int(),
  })).mutation(async ({ input }) => {
    const processedData = {
        userId: input.userId,
        assessmentId: input.assessmentId,
    };
    
    // Fetch the assessment
    const assessment = await prisma.assessment.findUnique({
      where: { id: processedData.assessmentId },
    });
  
    // Check if the assessment exists and the userId matches
    if (!assessment || assessment.userId !== processedData.userId) {
      throw new Error('Not authorized to delete this assessment');
    }
  
    // Delete the assessment
    await prisma.assessment.delete({ where: { id: processedData.assessmentId } });
  
    // Return a success message
    return { message: 'Assessment deleted successfully' };
  }),
  
});