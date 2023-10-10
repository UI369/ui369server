const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('../src/server.js'); // Import your Express app
const request = supertest(app);

describe('User Routes', () => {
  describe('POST /', () => {
    it('should register a new user', async () => {
      const newUser = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'Test@1234',
      };

      const response = await request.post('/register').send(newUser);

      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('User registered successfully');
    });

    it('should not register a user with an existing email', async () => {
      const existingUser = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'Test@1234',
      };

      const response = await request.post('/').send(existingUser);
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('User already exists');
    });

    it('should not register a user with an invalid email', async () => {
      const invalidUser = {
        username: 'testuser',
        email: 'invalidEmail',
        password: 'Test@1234',
      };

      const response = await request.post('/').send(invalidUser);
      expect(response.status).to.equal(400);
      // Adjust the error message based on your validation library's response
      expect(response.body.errors[0].msg).to.equal('Email is not valid');
    });

    it('should not register a user with a short password', async () => {
      const shortPasswordUser = {
        username: 'testuser',
        email: 'testuser2@example.com',
        password: 'Test',
      };

      const response = await request.post('/').send(shortPasswordUser);
      expect(response.status).to.equal(400);
      expect(response.body.errors[0].msg).to.equal(
        'Password must be at least 8 characters long',
      );
    });
  });

  // ... Add tests for other user routes if you have them.
});
