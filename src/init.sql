-- Docker init: 
-- docker run --name hooprunner_container -e POSTGRES_PASSWORD=5652988 -e POSTGRES_DB=hooprunner -p 5432:5432 -v /Users/ui369/Workspace/Code/UI369/ui369suite/ui369server/src/:/docker-entrypoint-initdb.d/ -d postgres
-- docker logs hooprunner_container 
-- docker exec -it hooprunner_container psql -U postgres -d hooprunner

-- Test DB:
-- docker run --name hooprunner_test_container -e POSTGRES_PASSWORD=5652988 -e POSTGRES_DB=hooprunner_test -p 5432:5432 -v /Users/ui369/Workspace/Code/UI369/ui369suite/ui369server/src/:/docker-entrypoint-initdb.d/ -d postgres
-- docker exec -it hooprunner_test_container psql -U postgres -d hooprunner_test
-- Player Table
CREATE TABLE Players (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    height INTEGER,
    weight INTEGER,
    birthdate DATE NOT NULL,
    comment TEXT,
    pic BYTEA
);

-- Create an ENUM type for player positions
DO $$ BEGIN
    CREATE TYPE player_position_type AS ENUM ('PG', 'SG', 'SF', 'PF', 'C');
EXCEPTION
    WHEN duplicate_object THEN null; -- do nothing, the type already exists
END $$;

-- Create an ENUM type for shirt size
DO $$ BEGIN
    CREATE TYPE shirt_size_type AS ENUM ('S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL', 'XXXXXL');
EXCEPTION
    WHEN duplicate_object THEN null; -- do nothing, the type already exists
END $$;

-- Alter the Players table to add the position column with the ENUM type
ALTER TABLE Players ADD COLUMN position player_position_type[];


-- Alter the Players table to add the shirt size column with the ENUM type
ALTER TABLE Players ADD COLUMN shirt_size shirt_size_type;

-- Season Table
CREATE TABLE Seasons (
    id SERIAL PRIMARY KEY,
    start_date DATE NOT NULL
);

-- Team Table
CREATE TABLE Teams (
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL,
    captain_id INTEGER REFERENCES Players(id),
    season_id INTEGER REFERENCES Seasons(id)
);

-- Game Table
CREATE TABLE Games (
    id SERIAL PRIMARY KEY,
    game_time TIMESTAMP NOT NULL,
    team_home_id INTEGER REFERENCES Teams(id),
    team_away_id INTEGER REFERENCES Teams(id),
    season_id INTEGER REFERENCES Seasons(id),
    home_score INTEGER,
    away_score INTEGER,
    location VARCHAR(255)
);

-- PlayerStats Table
CREATE TABLE PlayerStats (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES Players(id),
    game_id INTEGER REFERENCES Games(id),
    shots_attempted INTEGER,
    shots_made INTEGER,
    minutes_played INTEGER,
    threes_attempted INTEGER,
    threes_made INTEGER,
    fouls INTEGER,
    assists INTEGER,
    blocks INTEGER,
    steals INTEGER,
    freethrow_attempted INTEGER,
    freethrows_made INTEGER
);

ALTER TABLE PlayerStats 
ADD CONSTRAINT chk_shots CHECK (shots_made <= shots_attempted);

ALTER TABLE PlayerStats 
ADD CONSTRAINT chk_threes CHECK (threes_made <= threes_attempted);


-- TeamPlayers Junction Table (to represent many-to-many relationship between Teams and Players)
CREATE TABLE TeamPlayers (
    team_id INTEGER REFERENCES Teams(id),
    player_id INTEGER REFERENCES Players(id),
    PRIMARY KEY (team_id, player_id)
);

-- Inserting Players
INSERT INTO Players (first_name, last_name, birthdate, height, weight) VALUES 
('Player', 'A1', '1990-01-01', 70, 180),
('Player', 'A2', '1991-02-02', 71, 185),
('Player', 'A3', '1992-03-03', 72, 190),
('Player', 'A4', '1993-04-04', 73, 195),
('Player', 'A5', '1994-05-05', 74, 200),
('Player', 'A6', '1995-06-06', 75, 205),
('Player', 'A7', '1996-07-07', 76, 210),
('Player', 'A8', '1997-08-08', 77, 215),
('Player', 'A9', '1998-09-09', 118, 420),
('Player', 'B1', '1990-01-01', 70, 180),
('Player', 'B2', '1991-02-02', 71, 185),
('Player', 'B3', '1992-03-03', 72, 190),
('Player', 'B4', '1993-04-04', 73, 195),
('Player', 'B5', '1994-05-05', 74, 200),
('Player', 'B6', '1995-06-06', 75, 205),
('Player', 'B7', '1996-07-07', 76, 210),
('Player', 'B8', '1997-08-08', 77, 215),
('Player', 'B9', '1998-09-09', 108, 320),
('Player', 'C1', '1990-01-01', 70, 180),
('Player', 'C2', '1991-02-02', 71, 185),
('Player', 'C3', '1992-03-03', 72, 190),
('Player', 'C4', '1993-04-04', 73, 195),
('Player', 'C5', '1994-05-05', 74, 200),
('Player', 'C6', '1995-06-06', 75, 205),
('Player', 'C7', '2023-07-07', 76, 210),
('Player', 'C8', '1900-08-08', 77, 215),
('Player', 'C9', '1998-09-09', 98, 220),
('Player', 'D1', '1990-01-01', 70, 180),
('Player', 'D2', '1991-02-02', 71, 185),
('Player', 'D3', '1992-03-03', 72, 190),
('Player', 'D4', '1993-04-04', 73, 195),
('Player', 'D5', '1994-05-05', 74, 200),
('Player', 'D6', '1995-06-06', 75, 205),
('Player', 'D7', '1996-07-07', 76, 210),
('Player', 'D8', '1997-08-08', 77, 215),
('Player', 'D9', '1998-09-09', 88, 220);

-- Inserting a Season
INSERT INTO Seasons (start_date) VALUES ('2023-09-17');

-- Inserting Teams
INSERT INTO Teams (team_name, captain_id, season_id) VALUES 
('Team A', 1, 1),
('Team B', 10, 1),
('Team C', 19, 1),
('Team D', 28, 1);

-- Associating Players with Teams
INSERT INTO TeamPlayers (team_id, player_id) VALUES 
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9),
(2, 10), (2, 11), (2, 12), (2, 13), (2, 14), (2, 15), (2, 16), (2, 17), (2, 18),
(3, 19), (3, 20), (3, 21), (3, 22), (3, 23), (3, 24), (3, 25), (3, 26), (3, 27),
(4, 28), (4, 29), (4, 30), (4, 31), (4, 32), (4, 33), (4, 34), (4, 35), (4, 36);

-- Inserting games for the first season
INSERT INTO Games (game_time, team_home_id, team_away_id, season_id, home_score, away_score) VALUES
('2023-09-20 18:30:00-07', 1, 2, 1, NULL, NULL),
('2023-09-20 19:45:00-07', 3, 4, 1, NULL, NULL),

('2023-09-27 18:30:00-07', 1, 3, 1, NULL, NULL),
('2023-09-27 19:45:00-07', 2, 4, 1, NULL, NULL),
('2023-10-04 18:30:00-07', 1, 4, 1, NULL, NULL),
('2023-10-04 19:45:00-07', 2, 3, 1, NULL, NULL),
('2023-10-11 18:30:00-07', NULL, NULL, 1, NULL, NULL),
('2023-10-11 19:45:00-07', NULL, NULL, 1, NULL, NULL),
('2023-10-18 18:30:00-07', NULL, NULL, 1, NULL, NULL),
('2023-10-18 19:45:00-07', NULL, NULL, 1, NULL, NULL);

INSERT INTO PlayerStats (player_id, game_id, shots_attempted, shots_made, minutes_played, threes_attempted, threes_made, fouls, assists, blocks, steals, freethrow_attempted, freethrows_made) VALUES
(1, 1, 10, 5, 20, 3, 1, 2, 3, 1, 2, 4, 3),
(2, 1, 8, 4, 22, 2, 1, 1, 4, 0, 1, 3, 2),
(3, 1, 9, 5, 21, 3, 2, 2, 2, 1, 1, 4, 3),
(4, 1, 7, 3, 19, 2, 0, 3, 3, 0, 2, 3, 2),
(5, 1, 8, 4, 20, 3, 1, 2, 4, 1, 1, 4, 3),
(6, 1, 10, 6, 23, 4, 2, 1, 3, 0, 2, 5, 4),
(7, 1, 9, 4, 22, 3, 1, 3, 2, 1, 1, 4, 3),
(8, 1, 8, 3, 20, 2, 1, 2, 3, 0, 2, 3, 2),
(9, 1, 7, 3, 19, 2, 0, 3, 4, 1, 1, 4, 3),
(10, 1, 10, 5, 24, 4, 2, 2, 2, 0, 2, 5, 4),
(11, 1, 9, 4, 21, 3, 1, 3, 3, 1, 1, 4, 3),
(12, 1, 8, 3, 20, 2, 0, 2, 4, 0, 2, 3, 2),
(13, 1, 7, 2, 19, 1, 0, 3, 3, 1, 1, 4, 2),
(14, 1, 10, 5, 23, 4, 2, 1, 2, 0, 2, 5, 4),
(15, 1, 9, 4, 22, 3, 1, 3, 3, 1, 1, 4, 3),
(16, 1, 8, 3, 20, 2, 1, 2, 4, 0, 2, 3, 2),
(17, 1, 7, 3, 19, 2, 0, 3, 4, 1, 1, 4, 3),
(18, 1, 10, 6, 24, 4, 2, 1, 2, 0, 2, 5, 4);

INSERT INTO PlayerStats (player_id, game_id, shots_attempted, shots_made, minutes_played, threes_attempted, threes_made, fouls, assists, blocks, steals, freethrow_attempted, freethrows_made) VALUES
(19, 2, 10, 6, 20, 3, 1, 2, 3, 1, 2, 4, 3),
(20, 2, 8, 5, 22, 2, 1, 1, 4, 0, 1, 3, 2),
(21, 2, 9, 6, 21, 3, 2, 2, 2, 1, 1, 4, 3),
(22, 2, 7, 7, 19, 2, 0, 3, 3, 0, 2, 3, 2),
(23, 2, 8, 5, 20, 3, 1, 2, 4, 1, 1, 4, 3),
(24, 2, 10, 7, 23, 4, 2, 1, 3, 0, 2, 5, 4),
(25, 2, 9, 5, 22, 3, 1, 3, 2, 1, 1, 4, 3),
(26, 2, 8, 5, 20, 2, 1, 2, 3, 0, 2, 3, 2),
(27, 2, 7, 3, 19, 2, 0, 3, 4, 1, 1, 4, 3),
(28, 2, 10, 5, 24, 4, 2, 2, 2, 0, 2, 5, 4),
(29, 2, 9, 4, 21, 3, 1, 3, 3, 1, 1, 4, 3),
(30, 2, 8, 3, 20, 2, 0, 2, 4, 0, 2, 3, 2),
(31, 2, 7, 2, 19, 1, 0, 3, 3, 1, 1, 4, 2),
(32, 2, 10, 5, 23, 4, 2, 1, 2, 0, 2, 5, 4),
(33, 2, 9, 4, 22, 3, 1, 3, 3, 1, 1, 4, 3),
(34, 2, 8, 3, 20, 2, 1, 2, 4, 0, 2, 3, 2),
(35, 2, 7, 3, 19, 2, 0, 3, 4, 1, 1, 4, 3),
(36, 2, 10, 6, 24, 4, 2, 1, 2, 0, 2, 5, 4);

