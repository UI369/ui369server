import * as fs from 'fs';
import * as Papa from 'papaparse';

export function csvToData(
  filePath: string,
  gameId: number,
): {
  gameInfo: any;
  playerStats: Array<object>;
} {
  console.log('Entering csvToData:', filePath, gameId);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const gameInfo: any = {};
  const playerStats: Array<object> = [];
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
          gameInfo.game_time = new Date(row[1] + 'T18:15:00-07:00');
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
        } else if (row[0] == 'player_stat') {
          //Only add if they played
          if (Boolean(row[5]) == true) {
            const playerStat = {
              player_id: parseInt(row[4], 10),
              game_id: gameId,
              twos_attempted: parseInt(row[6], 10) || 0,
              twos_made: parseInt(row[7], 10) || 0,
              threes_attempted: parseInt(row[8], 10) || 0,
              threes_made: parseInt(row[9], 10) || 0,
              freethrows_attempted: parseInt(row[10], 10) || 0,
              freethrows_made: parseInt(row[11], 10) || 0,
              offensive_rebounds: parseInt(row[12], 10) || 0,
              defensive_rebounds: parseInt(row[13], 10) || 0,
              assists: parseInt(row[14], 10) || 0,
              steals: parseInt(row[15], 10) || 0,
              blocks: parseInt(row[16], 10) || 0,
              turnovers: parseInt(row[17], 10) || 0,
              fouls: parseInt(row[18], 10) || 0,
              //calculate points scored
              points:
                (parseInt(row[7], 10) || 0) * 2 +
                  (parseInt(row[9], 10) || 0) * 3 +
                  parseInt(row[11], 10) || 0,
            };

            playerStats.push(playerStat);
          }
        }
      });
    },
  });

  console.log('GAME INFO', gameInfo);

  return {
    gameInfo,
    playerStats,
  };
}
