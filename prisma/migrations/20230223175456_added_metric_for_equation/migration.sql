/*
  Warnings:

  - You are about to drop the column `equation` on the `Metric` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Metric" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT,
    "assessmentCriteriaId" INTEGER NOT NULL,
    "equationId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Metric_assessmentCriteriaId_fkey" FOREIGN KEY ("assessmentCriteriaId") REFERENCES "AssessmentCriteria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Metric_equationId_fkey" FOREIGN KEY ("equationId") REFERENCES "Equation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Metric" ("assessmentCriteriaId", "createdAt", "description", "id", "title", "type", "updatedAt") SELECT "assessmentCriteriaId", "createdAt", "description", "id", "title", "type", "updatedAt" FROM "Metric";
DROP TABLE "Metric";
ALTER TABLE "new_Metric" RENAME TO "Metric";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
