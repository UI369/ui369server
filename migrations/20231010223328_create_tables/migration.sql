-- CreateEnum
CREATE TYPE "player_position_type" AS ENUM ('PG', 'SG', 'SF', 'PF', 'C');

-- CreateEnum
CREATE TYPE "shirt_size_type" AS ENUM ('S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL', 'XXXXXL');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "eth_address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "player_id" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gamenight" (
    "id" SERIAL NOT NULL,
    "game_date" DATE NOT NULL,
    "max_slots" INTEGER NOT NULL,
    "slot_price" DECIMAL(10,2) DEFAULT 5.00,
    "slots_filled" INTEGER DEFAULT 0,

    CONSTRAINT "gamenight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gamenightreservations" (
    "id" SERIAL NOT NULL,
    "game_night_id" INTEGER,
    "player_id" INTEGER,
    "display_name" VARCHAR(255) NOT NULL,
    "reserved_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gamenightreservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "game_time" TIMESTAMP(6) NOT NULL,
    "team_home_id" INTEGER,
    "team_away_id" INTEGER,
    "season_id" INTEGER,
    "home_score" INTEGER,
    "away_score" INTEGER,
    "location" VARCHAR(255),

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playercredits" (
    "id" SERIAL NOT NULL,
    "player_id" INTEGER,
    "credits" DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    CONSTRAINT "playercredits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "height" INTEGER,
    "weight" INTEGER,
    "sex" VARCHAR(1) NOT NULL,
    "birthdate" DATE NOT NULL,
    "comment" TEXT,
    "pic" BYTEA,
    "hidden" BOOLEAN DEFAULT false,
    "position" "player_position_type"[],
    "shirt_size" "shirt_size_type",
    "userId" INTEGER,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playerstats" (
    "id" SERIAL NOT NULL,
    "player_id" INTEGER,
    "game_id" INTEGER,
    "home" BOOLEAN,
    "twos_attempted" INTEGER,
    "twos_made" INTEGER,
    "minutes_played" INTEGER,
    "threes_attempted" INTEGER,
    "threes_made" INTEGER,
    "fouls" INTEGER,
    "offensive_rebounds" INTEGER,
    "defensive_rebounds" INTEGER,
    "assists" INTEGER,
    "blocks" INTEGER,
    "steals" INTEGER,
    "freethrows_attempted" INTEGER,
    "freethrows_made" INTEGER,

    CONSTRAINT "playerstats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" SERIAL NOT NULL,
    "start_date" DATE NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teamplayers" (
    "team_id" INTEGER NOT NULL,
    "player_id" INTEGER NOT NULL,

    CONSTRAINT "teamplayers_pkey" PRIMARY KEY ("team_id","player_id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" SERIAL NOT NULL,
    "team_name" VARCHAR(255) NOT NULL,
    "captain_id" INTEGER,
    "season_id" INTEGER,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_player_id_key" ON "users"("player_id");

-- CreateIndex
CREATE UNIQUE INDEX "players_userId_key" ON "players"("userId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gamenightreservations" ADD CONSTRAINT "gamenightreservations_game_night_id_fkey" FOREIGN KEY ("game_night_id") REFERENCES "gamenight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gamenightreservations" ADD CONSTRAINT "gamenightreservations_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_team_away_id_fkey" FOREIGN KEY ("team_away_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_team_home_id_fkey" FOREIGN KEY ("team_home_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "playercredits" ADD CONSTRAINT "playercredits_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "playerstats" ADD CONSTRAINT "playerstats_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "playerstats" ADD CONSTRAINT "playerstats_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teamplayers" ADD CONSTRAINT "teamplayers_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teamplayers" ADD CONSTRAINT "teamplayers_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_captain_id_fkey" FOREIGN KEY ("captain_id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
