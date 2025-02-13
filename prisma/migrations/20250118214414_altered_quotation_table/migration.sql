/*
  Warnings:

  - You are about to drop the `qoutations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "qoutations" DROP CONSTRAINT "qoutations_projectId_fkey";

-- DropTable
DROP TABLE "qoutations";

-- CreateTable
CREATE TABLE "quotations" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "ammount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quotations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quotations_projectId_key" ON "quotations"("projectId");

-- AddForeignKey
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
