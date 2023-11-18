/*
  Warnings:

  - You are about to drop the column `facebookLink` on the `Footer` table. All the data in the column will be lost.
  - You are about to drop the column `instagramLink` on the `Footer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Burial" ADD COLUMN "image_extension" TEXT;
ALTER TABLE "Burial" ADD COLUMN "image_filesize" INTEGER;
ALTER TABLE "Burial" ADD COLUMN "image_height" INTEGER;
ALTER TABLE "Burial" ADD COLUMN "image_id" TEXT;
ALTER TABLE "Burial" ADD COLUMN "image_width" INTEGER;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Footer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "instagramHandle" TEXT NOT NULL DEFAULT '',
    "facebookHandle" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Footer" ("address", "facebookHandle", "id", "instagramHandle", "phone") SELECT "address", "facebookHandle", "id", "instagramHandle", "phone" FROM "Footer";
DROP TABLE "Footer";
ALTER TABLE "new_Footer" RENAME TO "Footer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
