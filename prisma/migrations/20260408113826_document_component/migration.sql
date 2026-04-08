-- CreateTable
CREATE TABLE "DocumentComponent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "href" TEXT,
    "parentId" TEXT,
    CONSTRAINT "DocumentComponent_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "DocumentComponent" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
