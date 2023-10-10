const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

router.get('/', (req, res) => {
  res.json({});
});

router.post(
  '/',
  [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Email is not valid'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log('errors', errors);
    console.log('req.body', req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await prisma.users.findUnique({
        where: { email: email },
      });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save the user to the database
      const newUser = await prisma.users.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
        },
      });

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
);

module.exports = router;
