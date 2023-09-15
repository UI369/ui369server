const express = require('express');
const storeFactory = require('../stores/dataAccessFactory');
const teamStore = storeFactory.getDataAccess().teamStore;
const router = express.Router();

router.get('/', (req, res) => {
  res.json(teamStore.findAll());
});

router.get('/:teamId', (req, res) => {
  const teamId = parseInt(req.params.teamId);

  if (isNaN(teamId)) {
    res.status(400).send({ error: 'in teams/teamId, teamId must be a number' });
    return;
  }

  res.status(200).json(teamStore.findById(teamId));
});

router.post('/', (req, res) => {
  const team = teamStore.create({
    teamName: req.body.teamName,
    players: req.body.players,
  });
  res.status(201).json(team);
});

router.delete('/:teamId', (req, res) => {
  const teamId = Number(req.params.teamId);
  const removed = teamStore.delete(teamId);

  if (!removed) {
    return res
      .status(404)
      .json({ message: `Team with id ${teamId} not found.` });
  }

  res.status(200).json({ message: `Team with id ${teamId} removed.` });
});

router.patch('/:teamId', (req, res) => {
  const teamId = Number(req.params.teamId);
  const updatedTeam = teamStore.update(teamId, {
    teamName: req.body.teamName,
    players: req.body.players,
  });

  if (!updatedTeam) {
    return res
      .status(404)
      .json({ message: `Team with id ${teamId} not found.` });
  }

  res.json(updatedTeam);
});

module.exports = router;
