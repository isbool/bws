/*
  Warnings:

  - A unique constraint covering the columns `[equationId]` on the table `Metric` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Metric_equationId_key" ON "Metric"("equationId");
