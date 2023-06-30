const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const server = require('../src/server');
const request = supertest(server);

describe('Card Routes', function () {
  it('should GET all cards', async function () {
    const response = await request.get('/cards');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('should POST a new card', async function () {
    const response = await request
      .post('/cards')
      .send({ title: 'Test Card', description: 'Test Description' });
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('title', 'Test Card');
    expect(response.body).to.have.property('description', 'Test Description');
  });

  it('should PATCH an existing card', async function () {
    // First, create a new card
    let card = await request
      .post('/cards')
      .send({ title: 'Test Card', description: 'Test Description' });
    let cardId = card.body.id;

    // Update the created card
    const response = await request
      .patch(`/cards/${cardId}`)
      .send({ title: 'Updated Card', description: 'Updated Description' });
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('title', 'Updated Card');
    expect(response.body).to.have.property(
      'description',
      'Updated Description',
    );
  });

  it('should DELETE an existing card', async function () {
    // First, create a new card
    let card = await request
      .post('/cards')
      .send({ title: 'Test Card', description: 'Test Description' });
    let cardId = card.body.id;

    // Delete the created card
    const response = await request.delete(`/cards/${cardId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property(
      'message',
      `Card with id ${cardId} removed.`,
    );
  });
});
