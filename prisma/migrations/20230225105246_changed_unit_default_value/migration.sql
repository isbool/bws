-- AlterTable
ALTER TABLE "Input" ADD COLUMN "definition" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Output" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "min" REAL,
    "max" REAL,
    "metricId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL DEFAULT 3,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Output_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Output_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Output" ("createdAt", "description", "id", "max", "metricId", "min", "name", "unitId", "updatedAt") SELECT "createdAt", "description", "id", "max", "metricId", "min", "name", "unitId", "updatedAt" FROM "Output";
DROP TABLE "Output";
ALTER TABLE "new_Output" RENAME TO "Output";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
