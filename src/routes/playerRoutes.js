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

router.get('/:playerId', (req, res) => {
  const playerId = parseInt(req.params.playerId);

  if (isNaN(playerId)) {
    res
      .status(400)
      .send({ error: 'in players/playerId, playerId must be a number' });
    return;
  }

  prisma.players
    .findUnique({
      where: {
        id: playerId,
      },
    })
    .then((player) => {
      res.json(player);
    })
    .catch((error) => {
      console.error('Error fetching player ${playerId}:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

module.exports = router;
