-- DropForeignKey
ALTER TABLE "freelancers" DROP CONSTRAINT "freelancers_identificationId_fkey";

-- AddForeignKey
ALTER TABLE "identifications" ADD CONSTRAINT "identifications_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
