-- CreateTable
CREATE TABLE "Map" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "centreCoordinates" TEXT NOT NULL DEFAULT '',
    "zoom" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Trail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "trailCoords" TEXT NOT NULL DEFAULT '',
    "colour" TEXT NOT NULL DEFAULT 'blue'
);
