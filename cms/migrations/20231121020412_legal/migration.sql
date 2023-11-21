-- CreateTable
CREATE TABLE "Privacy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]'
);

-- CreateTable
CREATE TABLE "Disclaimer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]'
);
