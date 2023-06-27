/*
  Warnings:

  - You are about to drop the `Metrics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Metrics";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Metric" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT,
    "equation" TEXT,
    "assessmentCriteriaId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Metric_assessmentCriteriaId_fkey" FOREIGN KEY ("assessmentCriteriaId") REFERENCES "AssessmentCriteria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
