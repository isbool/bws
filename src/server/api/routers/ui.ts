import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const uiRouter = createTRPCRouter({
  getAllNavBarItems: publicProcedure
  .query(({}) => {
    return prisma.navBarItem.findMany();
  }),
  getAllDimensions: publicProcedure
  .query(({}) => {
    return prisma.dimension.findMany();
  }),
  getAllStrategicObjectives: publicProcedure
  .query(({}) => {
    return prisma.strategicObjective.findMany();
  }),
  getAllAssessmentCritiria: publicProcedure
  .query(({}) => {
    return prisma.assessmentCriteria.findMany();
  }),
  getAllMetrics: publicProcedure
  .query(({}) => {
    return prisma.metric.findMany();
  }),
});
