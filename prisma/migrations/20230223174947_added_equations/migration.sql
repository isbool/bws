-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Equation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "format" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Input" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "min" REAL,
    "max" REAL,
    "equationId" INTEGER,
    "metricId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoryId" INTEGER,
    CONSTRAINT "Input_equationId_fkey" FOREIGN KEY ("equationId") REFERENCES "Equation" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Input_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Input_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Input_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Input" ("createdAt", "description", "id", "max", "metricId", "min", "name", "unitId", "updatedAt") SELECT "createdAt", "description", "id", "max", "metricId", "min", "name", "unitId", "updatedAt" FROM "Input";
DROP TABLE "Input";
ALTER TABLE "new_Input" RENAME TO "Input";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
