-- CreateTable
CREATE TABLE "_CategoryToFreelancer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToFreelancer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryToFreelancer_B_index" ON "_CategoryToFreelancer"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToFreelancer" ADD CONSTRAINT "_CategoryToFreelancer_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToFreelancer" ADD CONSTRAINT "_CategoryToFreelancer_B_fkey" FOREIGN KEY ("B") REFERENCES "freelancers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
