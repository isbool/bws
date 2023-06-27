-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Metrics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT,
    "equation" TEXT,
    "assessmentCriteriaId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Metrics_assessmentCriteriaId_fkey" FOREIGN KEY ("assessmentCriteriaId") REFERENCES "AssessmentCriteria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Metrics" ("assessmentCriteriaId", "createdAt", "description", "equation", "id", "title", "type", "updatedAt") SELECT "assessmentCriteriaId", "createdAt", "description", "equation", "id", "title", "type", "updatedAt" FROM "Metrics";
DROP TABLE "Metrics";
ALTER TABLE "new_Metrics" RENAME TO "Metrics";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
