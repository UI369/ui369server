const { Pool } = require('pg');
const chai = require('chai');
const expect = chai.expect;
const TeamStore = require('../src/stores/teamStore.js');
let client, teamStore;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hooprunner_test',
  password: process.env.DB_PW,
  port: 5432,
});

describe('Team Store DB', () => {
  beforeEach(async () => {
    // Start a transaction before each test
    client = await pool.connect();
    teamStore = new TeamStore(client);
    await client.query('BEGIN');
  });

  afterEach(async () => {
    // Rollback the transaction after each test
    await client.query('ROLLBACK');
    client.release();
  });

  it('should fetch all teams', async () => {
    const result = await teamStore.findAll();
    expect(result).to.be.an('array');
    expect(result.length).to.equal(4);
  });

  it('should fetch a team by id', async () => {
    const result = await teamStore.findById(1);
    expect(result).to.be.an('object');
    // Add more assertions based on your team attributes
    expect(result.team_name).to.equal('Team A');
  });

  it('should return null for non-existent team id', async () => {
    const result = await teamStore.findById(999);
    expect(result).to.be.null;
  });

  it('should add a team', async () => {
    const newTeam = {
      team_name: 'New Team',
      captain_id: 1,
      season_id: 1,
    };

    const result = await teamStore.create(newTeam);
    expect(result).to.be.an('object');
    expect(result.name).to.equal(newTeam.name);
    // ... other assertions
  });

  it('should update a team by id', async () => {
    const updatedTeam = {
      team_name: 'Updated Team',
      captainId: 2,
      season_id: 1,
    };
    const result = await teamStore.update(1, updatedTeam);
    expect(result.team_name).to.equal('Updated Team');
    expect(result.captain_id).to.equal(2);
    expect(result.season_id).to.equal(1);
  });

  it('should not delete a team and return null', async () => {
    const result = await teamStore.delete(1);
    expect(result).to.equal(null);
  });

  // Continue with tests for other methods if any.

  after(() => {
    pool.end(); // Close the database connection when done
  });
});
