const chai = require('chai');
const expect = chai.expect;
const teamStoreMock = require('../path-to-your-teamStoreMock');

describe('teamStoreMock', () => {
  afterEach(() => {
    // Reset the store after each test
    teamStoreMock.clear();
  });

  it('should fetch all teams', () => {
    const result = teamStoreMock.findAll();
    expect(result).to.be.an('array');
    expect(result.length).to.equal(3);
  });

  it('should fetch a team by id', () => {
    const result = teamStoreMock.findById(1);
    expect(result).to.be.an('object');
    expect(result.teamName).to.equal('Team 1');
  });

  it('should return null for non-existent team id', () => {
    const result = teamStoreMock.findById(999);
    expect(result).to.be.null;
  });

  it('should create a new team', () => {
    const newTeam = {
      teamName: 'Team 4',
      players: [{ playerName: 'John' }],
    };
    const result = teamStoreMock.create(newTeam);
    expect(result.id).to.equal(4);
    expect(result.teamName).to.equal('Team 4');
  });

  it('should delete a team by id', () => {
    const result = teamStoreMock.delete(1);
    expect(result.id).to.equal(1);
    expect(teamStoreMock.findAll().length).to.equal(2);
  });

  it('should update a team by id', () => {
    const updatedTeam = {
      teamName: 'Updated Team 1',
      players: [{ playerName: 'Updated Player' }],
    };
    const result = teamStoreMock.update(1, updatedTeam);
    expect(result.teamName).to.equal('Updated Team 1');
  });

  // ... Add more tests for other methods and scenarios
});
