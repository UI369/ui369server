const express = require('express');
const storeFactory = require('../stores/dataAccessFactory');
const playerStore = storeFactory.getDataAccess().playerStore;

const router = express.Router();

router.get('/', (req, res) => {
  playerStore
    .findAll()
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

  playerStore
    .findById(playerId)
    .then((player) => {
      res.json(player);
    })
    .catch((error) => {
      console.error('Error fetching player ${playerId}:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.post('/', (req, res) => {
  // Extract player data from the request body
  const newPlayer = req.body;

  // Create the player using the playerStore
  playerStore
    .create(newPlayer)
    .then((createdPlayer) => {
      // Send the created player in the response with a 201 status code
      res.status(201).json(createdPlayer);
    })
    .catch((error) => {
      console.error('Error creating player:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.delete('/:playerId', (req, res) => {
  res.status(200).json({ message: `delete not allowed.` });
});

router.patch('/:playerId', async (req, res) => {
  const playerId = Number(req.params.playerId);

  const updatedPlayer = playerStore
    .update(playerId, req.body)
    .then((updatedPlayer) => {
      // if (!updatedPlayer) {
      //   return res
      //     .status(404)
      //     .json({ message: `player with id ${playerId} not found.` });
      // }

      res.status(201).json(updatedPlayer);
    })
    .catch((error) => {
      console.log('error', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

module.exports = router;
