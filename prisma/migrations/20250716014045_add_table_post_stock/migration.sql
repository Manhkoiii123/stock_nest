/*
  Warnings:

  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "posts";

-- CreateTable
CREATE TABLE "stock" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "logoUrl" TEXT,
    "company_name" TEXT,
    "current_price" DOUBLE PRECISION,
    "percent_change" DOUBLE PRECISION,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "stockId" TEXT,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_symbol_key" ON "stock"("symbol");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE SET NULL ON UPDATE CASCADE;
