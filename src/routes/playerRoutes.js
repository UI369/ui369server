const express = require('express');
const storeFactory = require('../stores/dataAccessFactory');
const playerStore = storeFactory.getDataAccess().playerStore;

const router = express.Router();

router.get('/', (req, res) => {
  res.json(playerStore.findAll());
});

router.get('/:playerId', (req, res) => {
  const playerId = parseInt(req.params.playerId);

  if (isNaN(playerId)) {
    res
      .status(400)
      .send({ error: 'in players/playerId, playerId must be a number' });
    return;
  }

  res.status(200).json(playerStore.findById(playerId));
});

router.post('/', (req, res) => {
  const player = playerStore.create({
    playerName: req.body.playerName,
    roster: req.body.roster,
  });
  res.status(201).json(player);
});

router.delete('/:playerId', (req, res) => {
  const playerId = Number(req.params.playerId);
  const removed = playerStore.delete(playerId);

  if (!removed) {
    return res
      .status(404)
      .json({ message: `player with id ${playerId} not found.` });
  }

  res.status(200).json({ message: `player with id ${playerId} removed.` });
});

router.patch('/:playerId', (req, res) => {
  const playerId = Number(req.params.playerId);
  const updatedPlayer = playerStore.update(playerId, {
    playerName: req.body.playerName,
    roster: req.body.roster,
  });

  if (!updatedPlayer) {
    return res
      .status(404)
      .json({ message: `player with id ${playerId} not found.` });
  }

  res.json(updatedPlayer);
});

module.exports = router;
