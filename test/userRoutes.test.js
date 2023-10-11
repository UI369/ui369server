const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('../src/server.js'); // Import your Express app
const request = supertest(app);

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('User Routes', () => {
  let originalUsers = [];

  beforeEach(async () => {
    // Store the current state of the users table
    originalUsers = await prisma.users.findMany();
  });

  afterEach(async () => {
    // Delete all users
    await prisma.users.deleteMany();

    // Restore the original users
    await prisma.users.createMany({ data: originalUsers });
  });

  describe('POST /user/register', () => {
    it('should register a new user', async () => {
      const newUser = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'Test@1234',
      };

      const response = await request.post('/user/register').send(newUser);

      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('User registered successfully');
    });

    it('should not register a user with an existing email', async () => {
      const existingUser = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'Test@1234',
      };

      let response = await request.post('/user/register').send(existingUser);
      response = await request.post('/user/register').send(existingUser);
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('User already exists');
    });

    it('should not register a user with an invalid email', async () => {
      const invalidUser = {
        username: 'testuser2',
        email: 'invalidEmail',
        password: 'Test@1234',
      };

      const response = await request.post('/user/register').send(invalidUser);
      expect(response.status).to.equal(400);
      expect(response.body.errors[0].msg).to.equal('Email is not valid');
    });

    it('should not register a user with a short password', async () => {
      const shortPasswordUser = {
        username: 'testuser',
        email: 'testuser2@example.com',
        password: 'Test',
      };

      const response = await request
        .post('/user/register')
        .send(shortPasswordUser);
      expect(response.status).to.equal(400);
      expect(response.body.errors[0].msg).to.equal(
        'Password must be at least 8 characters long',
      );
    });
  });

  describe('Login Route', () => {
    describe('POST /user/login', () => {
      it('should return 400 for invalid email format', async () => {
        const response = await request.post('/user/login').send({
          email: 'invalidEmail',
          password: 'Test@1234',
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].msg).to.equal('Email is not valid');
      });

      it('should return 400 if password is not provided', async () => {
        const response = await request.post('/user/login').send({
          email: 'testuser@example.com',
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].msg).to.equal('Password is required');
      });

      it('should return 404 if user does not exist', async () => {
        const response = await request.post('/user/login').send({
          email: 'nonexistent@example.com',
          password: 'Test@1234',
        });

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('User not found');
      });
    });

    describe('POST /user/login with users created', () => {
      beforeEach(async () => {
        const newUser = {
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'Test@1234',
        };

        const response = await request.post('/user/register').send(newUser);
      });

      it('should return 400 for incorrect password', async () => {
        const response = await request.post('/user/login').send({
          email: 'testuser@example.com',
          password: 'WrongPassword',
        });

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Incorrect password');
      });

      it('should return 200 and a success message for valid credentials', async () => {
        const response = await request.post('/user/login').send({
          email: 'testuser@example.com',
          password: 'Test@1234',
        });

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Logged in successfully');
      });
    });
  });
});
