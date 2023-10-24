import * as fs from 'fs';
import * as Papa from 'papaparse';
import { GameInfo } from './types';
import { PlayerStat } from './types';

export function csvToData(
  filePath: string,
  gameId: number,
): {
  gameInfo: GameInfo;
  playerStats: PlayerStat[];
} {
  console.log('Entering csvToData:', filePath, gameId);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const gameInfo: GameInfo = {
    game_time: new Date(),
    home_score: 0,
    away_score: 0,
    location: '',
    season_id: 0,
    team_home_id: 0,
    team_away_id: 0,
    referee1: '',
    referee2: '',
  };

  const playerStats: PlayerStat[] = [];
  let team = ''; // To track the current team being processed

  Papa.parse(fileContent, {
    header: false,
    skipEmptyLines: true,
    complete: function (results) {
      // Explicitly cast results.data to the expected type
      const dataRows: string[][] = results.data as string[][];

      dataRows.forEach((row: string[], index: number) => {
        // Extracting game info
        if (row[0] === 'date') {
          gameInfo.game_time = new Date(row[1]);
        } else if (row[0] === 'home_score') {
          gameInfo.home_score = parseInt(row[1], 10);
        } else if (row[0] === 'away_score') {
          gameInfo.away_score = parseInt(row[1], 10);
        } else if (row[0] === 'location') {
          gameInfo.location = row[1];
        } else if (row[0] === 'season_id') {
          gameInfo.season_id = parseInt(row[1], 10);
        } else if (row[0] == 'home_team') {
          gameInfo.team_home_id = parseInt(row[1], 10);
        } else if (row[0] == 'away_team') {
          gameInfo.team_away_id = parseInt(row[1], 10);
        } else if (row[0] == 'referee1') {
          gameInfo.referee1 = row[1];
        } else if (row[0] == 'referee2') {
          gameInfo.referee2 = row[1];
        } else if (row[0] == 'home_stat' || row[0] == 'away_stat') {
          //Only add if they played
          let playerStat: any = {
            player_id: parseInt(row[4], 10),
            game_id: gameId,
          };
          console.log('Player true: ', playerStat, row);
          if (row[5] == 'T') {
            //if somehow a number wasnt entered, set to null
            playerStat.twos_attempted = parseInt(row[6], 10);
            playerStat.twos_attempted = isNaN(parseInt(row[6], 10))
              ? null
              : parseInt(row[6], 10);
            playerStat.twos_made = isNaN(parseInt(row[7], 10))
              ? null
              : parseInt(row[7], 10);

            playerStat.threes_attempted = isNaN(parseInt(row[8], 10))
              ? null
              : parseInt(row[8], 10);

            playerStat.threes_made = isNaN(parseInt(row[9], 10))
              ? null
              : parseInt(row[9], 10);

            playerStat.freethrows_attempted = isNaN(parseInt(row[10], 10))
              ? null
              : parseInt(row[10], 10);

            playerStat.freethrows_made = isNaN(parseInt(row[11], 10))
              ? null
              : parseInt(row[11], 10);

            playerStat.offensive_rebounds = isNaN(parseInt(row[12], 10))
              ? null
              : parseInt(row[12], 10);
            playerStat.defensive_rebounds = isNaN(parseInt(row[13], 10))
              ? null
              : parseInt(row[13], 10);
            playerStat.assists = isNaN(parseInt(row[14], 10))
              ? null
              : parseInt(row[14], 10);
            playerStat.steals = isNaN(parseInt(row[15], 10))
              ? null
              : parseInt(row[16], 10);
            playerStat.blocks = isNaN(parseInt(row[16], 10))
              ? null
              : parseInt(row[16], 10);

            playerStat.turnovers = isNaN(parseInt(row[17], 10))
              ? null
              : parseInt(row[17], 10);

            playerStat.fouls = isNaN(parseInt(row[18], 10))
              ? null
              : parseInt(row[18], 10);

            playerStat.played = true;
            //calculate points scored
            playerStat.points =
              (parseInt(row[7], 10) || 0) * 2 +
                (parseInt(row[9], 10) || 0) * 3 +
                parseInt(row[11], 10) || 0;
            playerStat.home = row[0] == 'home_stat';

            console.log('playerStat', playerStat);
          } else {
            playerStat.played = false;
            playerStat.home = row[0] == 'home_stat';
          }

          playerStats.push(playerStat);
        }
      });
    },
  });

  return {
    gameInfo,
    playerStats,
  };
}
