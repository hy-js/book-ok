/*
  Warnings:

  - The `favourite` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `owned` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `want` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "favourite",
ADD COLUMN     "favourite" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "owned",
ADD COLUMN     "owned" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "want",
ADD COLUMN     "want" BOOLEAN NOT NULL DEFAULT false;
