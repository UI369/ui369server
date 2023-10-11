const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('../src/server.js'); // Import your Express app
const request = supertest(app);
const fs = require('fs');

describe('Player Routes', () => {
  describe('GET /', () => {
    it('should fetch all players', async () => {
      const response = await request.get('/players');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.equal(36);
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
    });
  });
});

describe.skip('Defunct Player Routes', () => {
  describe('POST /', () => {
    it('should create a new player', async () => {
      const imageBuffer = fs.readFileSync('./test/img/kyrie.webp');

      const newPlayer = {
        first_name: 'Player',
        last_name: 'A1',
        birthdate: '1990-01-01T08:00:00.000Z',
        height: 70,
        weight: 180,
        shirt_size: 'L',
        position: ['PG', 'SG'],
        comment: "I'm the best!",
        pic: imageBuffer,
      };

      const response = await request.post('/players').send(newPlayer);
      expect(response.status).to.equal(201); // Assuming you return 201 for successful creation
      expect(response.body).to.be.an('object');
      expect(response.body.name).to.equal(newPlayer.name);
    });

    it('should return 400 for invalid player data', async () => {
      const invalidPlayer = {
        whatwaht: 'what!',
      };

      const response = await request.post('/players').send(invalidPlayer);
      expect(response.status).to.equal(400);
    });
  });

  describe('PATCH /:playerId', () => {
    it('should update a player by id', async () => {
      const updatedData = {
        first_name: 'Jane',
        last_name: 'Doe',
      };

      const response = await request.patch('/players/1').send(updatedData);
      console.log('response.body', response.body);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.first_name).to.equal(updatedData.first_name);
      expect(response.body.last_name).to.equal(updatedData.last_name);
    });

    it('should return 400 for invalid update data', async () => {
      const invalidData = {
        first_name: 'Jane',
        last_name: 'Doe',
      };

      const response = await request.patch('/players/1').send(invalidData);
      console.log('response.body', response.body);
      expect(response.status).to.equal(200);
    });
  });

  describe('DELETE /:playerId', () => {
    it('should return a message and not delete', async () => {
      const response = await request.delete('/players/1');
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('delete not allowed.');
    });
  });
});
