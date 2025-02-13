-- CreateTable
CREATE TABLE "portifolios" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "completed_at" TEXT,
    "freelancerId" TEXT NOT NULL,

    CONSTRAINT "portifolios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portifolio_assets" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "portifolioId" TEXT,

    CONSTRAINT "portifolio_assets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "portifolios" ADD CONSTRAINT "portifolios_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portifolio_assets" ADD CONSTRAINT "portifolio_assets_portifolioId_fkey" FOREIGN KEY ("portifolioId") REFERENCES "portifolios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
