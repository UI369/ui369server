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
        })
        .then((homeStats) => {
          // Fetch the away team stats
          return prisma.playerstats
            .findMany({
              where: {
                game_id: gameId,
                home: false,
              },
            })
            .then((awayStats) => {
              // Constructing the response
              const response = {
                ...game,
                homeStats,
                awayStats,
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
