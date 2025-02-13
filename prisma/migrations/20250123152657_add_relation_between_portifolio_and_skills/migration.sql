-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "portifolioId" TEXT;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_portifolioId_fkey" FOREIGN KEY ("portifolioId") REFERENCES "portifolios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
