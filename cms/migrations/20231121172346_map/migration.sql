/*
  Warnings:

  - You are about to drop the column `centreCoordinates` on the `Map` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Map" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "centreCoords" TEXT NOT NULL DEFAULT '',
    "zoom" INTEGER NOT NULL
);
INSERT INTO "new_Map" ("content", "id", "zoom") SELECT "content", "id", "zoom" FROM "Map";
DROP TABLE "Map";
ALTER TABLE "new_Map" RENAME TO "Map";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
