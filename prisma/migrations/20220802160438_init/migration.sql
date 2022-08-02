/*
  Warnings:

  - You are about to drop the column `publisher` on the `Book` table. All the data in the column will be lost.
  - The `publishedYear` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cover` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "publisher",
DROP COLUMN "publishedYear",
ADD COLUMN     "publishedYear" INTEGER,
DROP COLUMN "cover",
ADD COLUMN     "cover" INTEGER;