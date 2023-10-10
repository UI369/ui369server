const express = require('express');
const registrationRoutes = require('./registrationRoutes');
const teamRoutes = require('./teamRoutes');
const playerRoutes = require('./playerRoutes');
const statsRoutes = require('./statsRoutes');
const gameRoutes = require('./gameRoutes');
//const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/register', registrationRoutes);
router.use('/teams', teamRoutes);
router.use('/players', playerRoutes);
router.use('/stats', statsRoutes);
router.use('/games', gameRoutes);
//router.use('/auth', authRoutes);
router.use('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});
// add more routes here as needed, e.g.,:
// router.use('/users', userRoutes);

module.exports = router;
