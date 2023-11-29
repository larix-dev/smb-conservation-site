/*
  Warnings:

  - You are about to drop the column `content` on the `Map` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `Trail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `elevationGain` to the `Trail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `length` to the `Trail` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "TrailPage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]'
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "image_filesize" INTEGER,
    "image_extension" TEXT,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_id" TEXT,
    "length" REAL NOT NULL,
    "elevationGain" REAL NOT NULL,
    "difficulty" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "trailCoords" TEXT NOT NULL DEFAULT '',
    "colour" TEXT NOT NULL DEFAULT '#3b82f6'
);
INSERT INTO "new_Trail" ("colour", "id", "name", "trailCoords") SELECT "colour", "id", "name", "trailCoords" FROM "Trail";
DROP TABLE "Trail";
ALTER TABLE "new_Trail" RENAME TO "Trail";
CREATE TABLE "new_Map" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "centreCoords" TEXT NOT NULL DEFAULT '',
    "zoom" INTEGER NOT NULL
);
INSERT INTO "new_Map" ("centreCoords", "id", "zoom") SELECT "centreCoords", "id", "zoom" FROM "Map";
DROP TABLE "Map";
ALTER TABLE "new_Map" RENAME TO "Map";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
