/*
  Warnings:

  - Added the required column `slug` to the `subcategories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project_subscriptions" ADD COLUMN     "invitation" JSONB;

-- AlterTable
ALTER TABLE "subcategories" ADD COLUMN     "slug" TEXT NOT NULL;
