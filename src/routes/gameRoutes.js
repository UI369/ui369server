const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const { stats } = req.query;

  const includeClause = {};
  if (stats) {
    includeClause.playerstats = stats;
  }

  prisma.games
    .findMany({
      include: includeClause,
    })
    .then((games) => {
      res.json(games);
    })
    .catch((error) => {
      console.error('Error fetching player stats:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.get('/:gameId', (req, res) => {
  const gameId = parseInt(req.params.gameId);

  if (isNaN(gameId)) {
    res.status(400).send({ error: 'in games/gameId, gameId must be a number' });
    return;
  }

  // Fetch the game details
  prisma.games
    .findUnique({
      where: { id: gameId },
      include: {
        home_team: {
          select: {
            id: true,
            team_name: true,
            captain_id: true,
          },
        },
        away_team: {
          select: {
            id: true,
            team_name: true,
            captain_id: true,
          },
        },
      },
    })
    .then((game) => {
      if (!game) {
        res.status(404).send({ error: 'Game not found' });
        return;
      }

      // Fetch the home team stats
      return prisma.playerstats
        .findMany({
          where: {
            game_id: gameId,
            home: true,
          },
          include: {
            players: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        })
        .then((homeStats) => {
          const homeStatsWithPlayerName = homeStats.map((stat) => ({
            ...stat,
            playerName: `${stat.players.first_name} ${stat.players.last_name}`,
          }));

          // Fetch the away team stats
          return prisma.playerstats
            .findMany({
              where: {
                game_id: gameId,
                home: false,
              },
              include: {
                players: {
                  select: {
                    first_name: true,
                    last_name: true,
                  },
                },
              },
            })
            .then((awayStats) => {
              const awayStatsWithPlayerName = awayStats.map((stat) => ({
                ...stat,
                playerName: `${stat.players.first_name} ${stat.players.last_name}`,
              }));

              const response = {
                ...game,
                homeStats: homeStatsWithPlayerName,
                awayStats: awayStatsWithPlayerName,
              };

              res.json(response);
            });
        });
    })
    .catch((error) => {
      console.error('Error fetching game stats:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });

  // prisma.games
  //   .findUnique({
  //     include: includeClause,
  //     where: { id: gameId },
  //   })
  //   .then((games) => {
  //     res.json(games);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching player stats:', error);
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   });
});

module.exports = router;
