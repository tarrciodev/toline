/*
  Warnings:

  - Added the required column `quotation` to the `project_subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project_subscriptions" ADD COLUMN     "quotation" DOUBLE PRECISION NOT NULL;
