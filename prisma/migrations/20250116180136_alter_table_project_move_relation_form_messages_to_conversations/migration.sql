/*
  Warnings:

  - You are about to drop the column `projectId` on the `messages` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `conversations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_projectId_fkey";

-- AlterTable
ALTER TABLE "conversations" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "projectId";

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
