const express = require('express');
const cardRoutes = require('./cardRoutes');

const router = express.Router();

router.use('/cards', cardRoutes);

// add more routes here as needed, e.g.,:
// router.use('/users', userRoutes);

module.exports = router;
