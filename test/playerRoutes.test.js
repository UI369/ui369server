require('dotenv').config();
const chai = require('chai');
const expect = chai.expect;
const storeFactory = require('../src/stores/dataAccessFactory');
const playerStore = storeFactory.getDataAccess().playerStore;

describe('playerStore', () => {
  afterEach(() => {
    // Reset the store after each test
    playerStore.reset();
  });

  it('should fetch all players', () => {
    const result = playerStore.findAll();
    expect(result).to.be.an('array');
    expect(result.length).to.equal(3);
  });

  it('should fetch a player by id', () => {
    const result = playerStore.findById(1);
    expect(result).to.be.an('object');
    expect(result.playerName).to.equal('Player 1');
  });

  it('should return null for non-existent player id', () => {
    const result = playerStore.findById(999);

    expect(result).to.be.null;
  });

  it('should create a new player', () => {
    const newPlayer = {
      playerName: 'Player 4',
      players: [{ playerName: 'John' }],
    };
    const result = playerStore.create(newPlayer);
    expect(result.id).to.equal(4);
    expect(result.playerName).to.equal('Player 4');
  });

  it('should delete a player by id', () => {
    const result = playerStore.delete(1);
    expect(result.id).to.equal(1);
    expect(playerStore.findAll().length).to.equal(2);
  });

  it('should update a player by id', () => {
    const updatedPlayer = {
      playerName: 'Updated Player 1',
      players: [{ playerName: 'Updated Player' }],
    };
    const result = playerStore.update(1, updatedPlayer);
    expect(result.playerName).to.equal('Updated Player 1');
  });

  // ... Add more tests for other methods and scenarios
});
