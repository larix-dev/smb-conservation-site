-- CreateTable
CREATE TABLE "Footer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "instagramHandle" TEXT NOT NULL DEFAULT '',
    "instagramLink" TEXT NOT NULL DEFAULT '',
    "facebookHandle" TEXT NOT NULL DEFAULT '',
    "facebookLink" TEXT NOT NULL DEFAULT ''
);
