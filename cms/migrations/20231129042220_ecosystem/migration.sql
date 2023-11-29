/*
  Warnings:

  - You are about to drop the column `origin` on the `Product` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "EcosystemPage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]'
);

-- CreateTable
CREATE TABLE "Organism" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "scientificName" TEXT NOT NULL DEFAULT '',
    "urlId" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL,
    "conservationStatus" TEXT NOT NULL DEFAULT 'Unclassified',
    "image_filesize" INTEGER,
    "image_extension" TEXT,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_id" TEXT,
    "description" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]'
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "trailCoords" TEXT NOT NULL DEFAULT '',
    "colour" TEXT NOT NULL DEFAULT '#3b82f6'
);
INSERT INTO "new_Trail" ("colour", "id", "name", "trailCoords") SELECT "colour", "id", "name", "trailCoords" FROM "Trail";
DROP TABLE "Trail";
ALTER TABLE "new_Trail" RENAME TO "Trail";
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "urlId" TEXT NOT NULL DEFAULT '',
    "image_filesize" INTEGER,
    "image_extension" TEXT,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_id" TEXT,
    "isService" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]'
);
INSERT INTO "new_Product" ("description", "id", "image_extension", "image_filesize", "image_height", "image_id", "image_width", "isService", "title", "urlId") SELECT "description", "id", "image_extension", "image_filesize", "image_height", "image_id", "image_width", "isService", "title", "urlId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
