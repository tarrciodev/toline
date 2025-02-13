/*
  Warnings:

  - Added the required column `estimated_date` to the `project_subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `justification_text` to the `project_subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `required_informations` to the `project_subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `similar_experiences` to the `project_subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project_subscriptions" ADD COLUMN     "estimated_date" TEXT NOT NULL,
ADD COLUMN     "justification_text" TEXT NOT NULL,
ADD COLUMN     "required_informations" TEXT NOT NULL,
ADD COLUMN     "similar_experiences" TEXT NOT NULL;
