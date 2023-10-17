/*
  Warnings:

  - Added the required column `short_name` to the `teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "short_name" VARCHAR(255) NOT NULL;
