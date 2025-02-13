-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
