/*
  Warnings:

  - You are about to drop the column `freethrow_attempted` on the `playerstats` table. All the data in the column will be lost.
  - You are about to drop the column `shots_attempted` on the `playerstats` table. All the data in the column will be lost.
  - You are about to drop the column `shots_made` on the `playerstats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "playerstats" DROP COLUMN "freethrow_attempted",
DROP COLUMN "shots_attempted",
DROP COLUMN "shots_made",
ADD COLUMN     "defensive_rebounds" INTEGER,
ADD COLUMN     "freethrows_attempted" INTEGER,
ADD COLUMN     "offensive_rebounds" INTEGER,
ADD COLUMN     "twos_attempted" INTEGER,
ADD COLUMN     "twos_made" INTEGER;
