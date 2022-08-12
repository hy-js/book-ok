/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Interaction` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Property" AS ENUM ('NIL', 'OWNED', 'WANT', 'SELLING');

-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "updatedAt",
ADD COLUMN     "property" "Property" NOT NULL DEFAULT 'NIL';
