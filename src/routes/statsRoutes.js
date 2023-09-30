const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const { player, game } = req.query;

  const whereClause = {};
  if (player) {
    whereClause.player_id = +player;
  }
  if (game) {
    whereClause.game_id = +game;
  }

  prisma.playerstats
    .findMany({
      where: whereClause,
    })
    .then((stats) => {
      res.json(stats);
    })
    .catch((error) => {
      console.error('Error fetching player stats:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

module.exports = router;
