require('dotenv').config();
const chai = require('chai');
const expect = chai.expect;
const storeFactory = require('../src/stores/dataAccessFactory');
const teamStore = storeFactory.getDataAccess().teamStore;

describe('teamStore', () => {
  afterEach(() => {
    // Reset the store after each test
    teamStore.reset();
  });

  it('should fetch all teams', () => {
    const result = teamStore.findAll();
    expect(result).to.be.an('array');
    expect(result.length).to.equal(3);
  });

  it('should fetch a team by id', () => {
    const result = teamStore.findById(1);
    expect(result).to.be.an('object');
    expect(result.teamName).to.equal('Team 1');
  });

  it('should return null for non-existent team id', () => {
    const result = teamStore.findById(999);

    expect(result).to.be.null;
  });

  it('should create a new team', () => {
    const newTeam = {
      teamName: 'Team 4',
      players: [{ playerName: 'John' }],
    };
    const result = teamStore.create(newTeam);
    expect(result.id).to.equal(4);
    expect(result.teamName).to.equal('Team 4');
  });

  it('should delete a team by id', () => {
    const result = teamStore.delete(1);
    expect(result.id).to.equal(1);
    expect(teamStore.findAll().length).to.equal(2);
  });

  it('should update a team by id', () => {
    const updatedTeam = {
      teamName: 'Updated Team 1',
      players: [{ playerName: 'Updated Player' }],
    };
    const result = teamStore.update(1, updatedTeam);
    expect(result.teamName).to.equal('Updated Team 1');
  });

  // ... Add more tests for other methods and scenarios
});
