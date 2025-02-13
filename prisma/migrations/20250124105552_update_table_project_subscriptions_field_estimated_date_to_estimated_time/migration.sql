/*
  Warnings:

  - You are about to drop the column `estimated_date` on the `project_subscriptions` table. All the data in the column will be lost.
  - Added the required column `estimated_time` to the `project_subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project_subscriptions" DROP COLUMN "estimated_date",
ADD COLUMN     "estimated_time" TEXT NOT NULL;
