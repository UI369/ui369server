/*
  Warnings:

  - Added the required column `played` to the `playerstats` table without a default value. This is not possible if the table is not empty.
  - Made the column `home` on table `playerstats` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "playerstats" ADD COLUMN     "played" BOOLEAN NOT NULL,
ALTER COLUMN "home" SET NOT NULL;
