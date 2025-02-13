/*
  Warnings:

  - You are about to drop the column `portifolioId` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `skills` table. All the data in the column will be lost.
  - Added the required column `slug` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_portifolioId_fkey";

-- AlterTable
ALTER TABLE "skills" DROP COLUMN "portifolioId",
DROP COLUMN "tag",
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_PortifolioToSkill" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PortifolioToSkill_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PortifolioToSkill_B_index" ON "_PortifolioToSkill"("B");

-- AddForeignKey
ALTER TABLE "_PortifolioToSkill" ADD CONSTRAINT "_PortifolioToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "portifolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PortifolioToSkill" ADD CONSTRAINT "_PortifolioToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
