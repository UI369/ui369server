const express = require('express');
const cardStore = require('../stores/cardStore');

const router = express.Router();

router.get('/', (req, res) => {
    res.json(cardStore.findAll());
});

router.post('/', (req, res) => {
    const card = cardStore.create({
        title: req.body.title,
        description: req.body.description,
    });
    res.status(201).json(card);
});

router.delete('/:cardId', (req, res) => {
    const cardId = Number(req.params.cardId);
    const removed = cardStore.delete(cardId);

    if (!removed) {
        return res.status(404).json({ message: `Card with id ${cardId} not found.` });
    }

    res.status(200).json({ message: `Card with id ${cardId} removed.` });
});

router.patch('/:cardId', (req, res) => {
    const cardId = Number(req.params.cardId);
    const updatedCard = cardStore.update(cardId, {
        title: req.body.title,
        description: req.body.description,
    });

    if (!updatedCard) {
        return res.status(404).json({ message: `Card with id ${cardId} not found.` });
    }

    res.json(updatedCard);
});

module.exports = router;
