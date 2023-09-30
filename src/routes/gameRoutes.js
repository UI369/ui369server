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
  const { stats } = req.query;

  if (isNaN(gameId)) {
    res.status(400).send({ error: 'in games/gameId, gameId must be a number' });
    return;
  }

  const includeClause = {};
  includeClause.playerstats = true;

  prisma.games
    .findUnique({
      include: includeClause,
      where: { id: gameId },
    })
    .then((games) => {
      res.json(games);
    })
    .catch((error) => {
      console.error('Error fetching player stats:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

module.exports = router;
