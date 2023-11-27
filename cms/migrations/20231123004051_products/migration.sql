-- CreateTable
CREATE TABLE "ProductsServicesPage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]'
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "urlId" TEXT NOT NULL DEFAULT '',
    "image_filesize" INTEGER,
    "image_extension" TEXT,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_id" TEXT,
    "isService" BOOLEAN NOT NULL DEFAULT false,
    "origin" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]'
);
