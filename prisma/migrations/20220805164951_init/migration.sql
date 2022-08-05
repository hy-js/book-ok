/*
  Warnings:

  - Made the column `readingGoal` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "readingGoal" SET NOT NULL;
