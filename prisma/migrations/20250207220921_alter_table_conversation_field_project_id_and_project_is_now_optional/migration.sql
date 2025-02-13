-- AlterTable
ALTER TABLE "conversations" ALTER COLUMN "projectId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "saw" BOOLEAN NOT NULL DEFAULT false;
