-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT,
    "description" TEXT,
    "htmlContent" TEXT NOT NULL,
    "authorId" TEXT,
    "proofreaderId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Post_proofreaderId_fkey" FOREIGN KEY ("proofreaderId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
