import { createTRPCRouter } from "./trpc";
import { uiRouter } from "./routers/ui";
import { guideRouter } from "./routers/guide";
import { recordsRouter } from "./routers/records";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  guide: guideRouter,
  records: recordsRouter,
  ui: uiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
