/*
  Warnings:

  - You are about to drop the column `unit` on the `Input` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `Output` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Unit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_InputToUnit" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_InputToUnit_A_fkey" FOREIGN KEY ("A") REFERENCES "Input" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_InputToUnit_B_fkey" FOREIGN KEY ("B") REFERENCES "Unit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_OutputToUnit" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_OutputToUnit_A_fkey" FOREIGN KEY ("A") REFERENCES "Output" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OutputToUnit_B_fkey" FOREIGN KEY ("B") REFERENCES "Unit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Input" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "min" REAL,
    "max" REAL,
    "metricId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Input_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Input" ("createdAt", "description", "id", "max", "metricId", "min", "name", "updatedAt") SELECT "createdAt", "description", "id", "max", "metricId", "min", "name", "updatedAt" FROM "Input";
DROP TABLE "Input";
ALTER TABLE "new_Input" RENAME TO "Input";
CREATE TABLE "new_Output" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "min" REAL,
    "max" REAL,
    "metricId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Output_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Output" ("createdAt", "description", "id", "max", "metricId", "min", "name", "updatedAt") SELECT "createdAt", "description", "id", "max", "metricId", "min", "name", "updatedAt" FROM "Output";
DROP TABLE "Output";
ALTER TABLE "new_Output" RENAME TO "Output";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_InputToUnit_AB_unique" ON "_InputToUnit"("A", "B");

-- CreateIndex
CREATE INDEX "_InputToUnit_B_index" ON "_InputToUnit"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OutputToUnit_AB_unique" ON "_OutputToUnit"("A", "B");

-- CreateIndex
CREATE INDEX "_OutputToUnit_B_index" ON "_OutputToUnit"("B");
