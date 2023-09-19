const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('../src/server.js'); // Import your Express app
const request = supertest(app);

describe('Team Routes', () => {
  describe('GET /', () => {
    it('should fetch all teams', async () => {
      const response = await request.get('/teams');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      // ... other assertions
    });
  });

  describe('GET /:teamId', () => {
    it('should fetch a team by id', async () => {
      const response = await request.get('/teams/1');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      // ... other assertions
    });

    it('should return 400 for invalid teamId', async () => {
      const response = await request.get('/teams/invalidId');
      expect(response.status).to.equal(400);
      // ... other assertions
    });
  });

  // ... Add tests for POST, DELETE, PATCH, etc.
});
