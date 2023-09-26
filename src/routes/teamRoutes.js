const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  prisma.teams
    .findMany({
      include: {
        teamplayers: {
          include: {
            players: true,
          },
        },
      },
    })
    .then((teams) => {
      const transformedTeams = teams.map((team) => {
        return {
          ...team,
          players: team.teamplayers.map((tp) => tp.players),
          teamplayers: undefined,
        };
      });
      res.json(transformedTeams);
    })
    .catch((error) => {
      console.error('Error fetching teams:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.get('/:teamId', (req, res) => {
  const teamId = parseInt(req.params.teamId);

  if (isNaN(teamId)) {
    res.status(400).send({ error: 'in teams/teamId, teamId must be a number' });
    return;
  }

  prisma.teams
    .findUnique({
      where: {
        id: teamId,
      },
      include: {
        teamplayers: {
          include: {
            players: true,
          },
        },
      },
    })
    .then((team) => {
      if (team) {
        const transformedTeam = {
          ...team,
          players: team.teamplayers.map((tp) => tp.players),
          teamplayers: undefined,
        };
        res.json(transformedTeam);
      } else {
        res.status(404).json({ message: `Team with id ${teamId} not found` });
      }
    })
    .catch((error) => {
      console.error(`Error fetching team ${teamId}:`, error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

module.exports = router;
