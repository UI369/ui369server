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

describe('teamStore', () => {
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
    console.log('result', result);
    expect(result.length).to.equal(4);
  });

  it('should fetch a team by id', async () => {
    const result = await teamStore.findById(1);
    expect(result).to.be.an('object');
    // Add more assertions based on your team attributes
    expect(result.name).to.equal('Team A');
  });

  it('should return null for non-existent team id', async () => {
    const result = await teamStore.findById(999);
    expect(result).to.be.null;
  });

  it('should add a team', async () => {
    const newTeam = {
      name: 'New Team',
      // ... other team attributes
    };

    const result = await teamStore.create(newTeam);
    expect(result).to.be.an('object');
    expect(result.name).to.equal(newTeam.name);
    // ... other assertions
  });

  it('should update a team by id', async () => {
    const updatedTeam = {
      name: 'Updated Team',
      // ... other attributes to update
    };
    const result = await teamStore.update(1, updatedTeam);
    expect(result.name).to.equal('Updated Team');
    // ... other assertions
  });

  it('should delete a team and return null', async () => {
    const result = await teamStore.delete(2);
    expect(result).to.equal(null);
    // If you want to check the count after deletion:
    // expect(teamStore.findAll().length).to.equal(9);
  });

  // Continue with tests for other methods if any.

  after(() => {
    pool.end(); // Close the database connection when done
  });
});
