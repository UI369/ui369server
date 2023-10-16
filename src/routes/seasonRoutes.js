const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const router = express.Router();

// Get all seasons
router.get('/', (req, res) => {
  prisma.seasons
    .findMany({
      include: {
        games: true,
        teams: true,
      },
    })
    .then((seasons) => {
      res.json(seasons);
    })
    .catch((error) => {
      console.error('Error fetching seasons:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

// Get a specific season by ID
router.get('/:seasonId', (req, res) => {
  const seasonId = parseInt(req.params.seasonId);

  if (isNaN(seasonId)) {
    res
      .status(400)
      .send({ error: 'in seasons/seasonId, seasonId must be a number' });
    return;
  }

  prisma.seasons
    .findUnique({
      where: {
        id: seasonId,
      },
      include: {
        games: true,
        teams: true,
      },
    })
    .then((season) => {
      if (season) {
        res.json(season);
      } else {
        res
          .status(404)
          .json({ message: `Season with id ${seasonId} not found` });
      }
    })
    .catch((error) => {
      console.error(`Error fetching season ${seasonId}:`, error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

module.exports = router;
