/*
  Warnings:

  - You are about to drop the `_InputToUnit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OutputToUnit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_InputToUnit_B_index";

-- DropIndex
DROP INDEX "_InputToUnit_AB_unique";

-- DropIndex
DROP INDEX "_OutputToUnit_B_index";

-- DropIndex
DROP INDEX "_OutputToUnit_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_InputToUnit";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_OutputToUnit";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Output" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "min" REAL,
    "max" REAL,
    "metricId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Output_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Output_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Output" ("createdAt", "description", "id", "max", "metricId", "min", "name", "updatedAt") SELECT "createdAt", "description", "id", "max", "metricId", "min", "name", "updatedAt" FROM "Output";
DROP TABLE "Output";
ALTER TABLE "new_Output" RENAME TO "Output";
CREATE TABLE "new_Input" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "min" REAL,
    "max" REAL,
    "metricId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Input_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Input_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Input" ("createdAt", "description", "id", "max", "metricId", "min", "name", "updatedAt") SELECT "createdAt", "description", "id", "max", "metricId", "min", "name", "updatedAt" FROM "Input";
DROP TABLE "Input";
ALTER TABLE "new_Input" RENAME TO "Input";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
