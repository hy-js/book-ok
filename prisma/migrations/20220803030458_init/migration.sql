-- CreateEnum
CREATE TYPE "Status" AS ENUM ('TBR', 'READ', 'READING', 'DNF');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "status" "Status"[];
