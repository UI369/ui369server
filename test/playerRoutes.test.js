const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('../src/server.js'); // Import your Express app
const request = supertest(app);

describe('Player Routes', () => {
  describe('GET /', () => {
    it('should fetch all players', async () => {
      const response = await request.get('/players');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      // ... other assertions
    });
  });

  describe('GET /:playerId', () => {
    it('should fetch a player by id', async () => {
      const response = await request.get('/players/1');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      // ... other assertions
    });

    it('should return 400 for invalid playerId', async () => {
      const response = await request.get('/players/invalidId');
      expect(response.status).to.equal(400);
      // ... other assertions
    });
  });

  // ... Add tests for POST, DELETE, PATCH, etc.
});
