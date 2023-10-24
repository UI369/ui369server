const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  prisma.players
    .findMany()
    .then((players) => {
      res.json(players);
    })
    .catch((error) => {
      console.error('Error fetching players:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.get('/:playerId', async (req, res) => {
  const playerId = parseInt(req.params.playerId);

  if (isNaN(playerId)) {
    return res
      .status(400)
      .send({ error: 'In player/:id, id must be a number' });
  }

  try {
    const player = await prisma.players.findUnique({
      where: {
        id: playerId,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        height: true,
        weight: true,
        position: true,
        birthdate: true,
        shirt_size: true,
        // ... other fields from 'players' model
        playerstats: {
          select: {
            game_id: true,
            home: true,
            played: true,
            twos_attempted: true,
            twos_made: true,
            minutes_played: true,
            threes_attempted: true,
            threes_made: true,
            fouls: true,
            offensive_rebounds: true,
            defensive_rebounds: true,
            assists: true,
            blocks: true,
            steals: true,
            freethrows_attempted: true,
            freethrows_made: true,
            turnovers: true,
            points: true,
            games: {
              select: {
                game_time: true,
                home_score: true,
                away_score: true,
                location: true,
                referee1: true,
                referee2: true,
                referee3: true,
                season_id: true,
                seasons: {
                  select: {
                    start_date: true,
                  },
                },
                away_team: {
                  select: {
                    id: true,
                    // you can add more fields from the 'teams' model if needed
                  },
                },
                home_team: {
                  select: {
                    id: true,
                    // you can add more fields from the 'teams' model if needed
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!player) {
      return res.status(404).send({ error: 'Player not found' });
    }

    res.json(player);
  } catch (error) {
    console.error('Error fetching player details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// router.get('/:playerId', (req, res) => {
//   const playerId = parseInt(req.params.playerId);

//   if (isNaN(playerId)) {
//     res
//       .status(400)
//       .send({ error: 'in players/playerId, playerId must be a number' });
//     return;
//   }

//   prisma.players
//     .findUnique({
//       where: {
//         id: playerId,
//       },
//     })
//     .then((player) => {
//       res.json(player);
//     })
//     .catch((error) => {
//       console.error('Error fetching player ${playerId}:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     });
// });

module.exports = router;
