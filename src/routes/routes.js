const express = require('express');
const teamRoutes = require('./teamRoutes');
const playerRoutes = require('./playerRoutes');
//const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/teams', teamRoutes);
router.use('/players', playerRoutes);
//router.use('/auth', authRoutes);
router.use('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});
// add more routes here as needed, e.g.,:
// router.use('/users', userRoutes);

module.exports = router;
