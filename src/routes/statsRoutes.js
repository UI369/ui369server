const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const router = express.Router();

router.get('/player/:playerId', async (req, res) => {
  const playerId = Number(req.params.playerId);

  try {
    const statsForPlayer = await prisma.playerstats.findMany({
      where: {
        player_id: playerId,
      },
      include: {
        games: true, // Include game details with each stat entry
        players: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
      orderBy: {
        game_id: 'asc',
      },
    });

    // Enhance the stats with player's name
    const statsWithName = statsForPlayer.map((stat) => ({
      ...stat,
      playerName: `${stat.players.first_name} ${stat.players.last_name}`,
    }));

    // Aggregate stats
    const aggregateStats = {
      twos_attempted: 0,
      twos_made: 0,
      threes_attempted: 0,
      threes_made: 0,
      free_throws_attempted: 0,
      free_throws_made: 0,
      rebounds_offensive: 0,
      rebounds_defensive: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      points: 0,
    };

    statsForPlayer.forEach((stat) => {
      aggregateStats.twos_attempted += stat.twos_attempted || 0;
      aggregateStats.twos_made += stat.twos_made || 0;
      aggregateStats.threes_attempted += stat.threes_attempted || 0;
      aggregateStats.threes_made += stat.threes_made || 0;
      aggregateStats.free_throws_attempted += stat.free_throws_attempted || 0;
      aggregateStats.free_throws_made += stat.free_throws_made || 0;
      aggregateStats.rebounds_offensive += stat.rebounds_offensive || 0;
      aggregateStats.rebounds_defensive += stat.rebounds_defensive || 0;
      aggregateStats.assists += stat.assists || 0;
      aggregateStats.steals += stat.steals || 0;
      aggregateStats.blocks += stat.blocks || 0;
      aggregateStats.turnovers += stat.turnovers || 0;
      aggregateStats.points += stat.points || 0;
    });

    res.json({
      statsByGame: statsWithName,
      aggregate: aggregateStats,
    });
  } catch (error) {
    console.error('Error fetching player stats:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

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
