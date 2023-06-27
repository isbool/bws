-- CreateTable
CREATE TABLE "Metrics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT,
    "equation" TEXT NOT NULL,
    "assessmentCriteriaId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Metrics_assessmentCriteriaId_fkey" FOREIGN KEY ("assessmentCriteriaId") REFERENCES "AssessmentCriteria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
