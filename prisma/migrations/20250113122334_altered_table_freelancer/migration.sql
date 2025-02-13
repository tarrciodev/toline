/*
  Warnings:

  - You are about to drop the column `bio` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_SkillToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SkillToUser" DROP CONSTRAINT "_SkillToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SkillToUser" DROP CONSTRAINT "_SkillToUser_B_fkey";

-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "bio" TEXT;

-- AlterTable
ALTER TABLE "freelancers" ADD COLUMN     "bio" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "bio";

-- DropTable
DROP TABLE "_SkillToUser";
