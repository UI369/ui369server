const { Pool } = require('pg');
const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;
const PlayerStore = require('../src/stores/playerStore.js');
let client, playerStore;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hooprunner_test',
  password: process.env.DB_PW,
  port: 5432,
});

describe('playerStore', () => {
  beforeEach(async () => {
    // Start a transaction before each test
    client = await pool.connect();
    playerStore = new PlayerStore(client);
    await client.query('BEGIN');
  });

  afterEach(async () => {
    // Rollback the transaction after each test
    await client.query('ROLLBACK');
    client.release();
  });

  it('should fetch all players', async () => {
    const result = await playerStore.findAll();
    expect(result).to.be.an('array');
    expect(result.length).to.equal(36);
  });

  it('should fetch a player by id', async () => {
    const result = await playerStore.findById(1);
    expect(result).to.be.an('object');
    expect(result.first_name).to.equal('Player');
    expect(result.last_name).to.equal('A1');
    expect(result.weight).to.equal(180);
  });

  it('should return null for non-existent player id', async () => {
    const result = await playerStore.findById(999);
    expect(result).to.be.null;
  });

  it('should add a player', async () => {
    // console.log(process.cwd());
    // Read the image into a buffer
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

    const result = await playerStore.create(newPlayer);
    expect(result).to.be.an('object');
    expect(result.name).to.be.undefined;
    expect(result.first_name).to.equal(newPlayer.first_name);
    expect(result.last_name).to.equal(newPlayer.last_name);
    expect(result.birthdate.toISOString()).to.equal(
      new Date(newPlayer.birthdate).toISOString(),
    );
    expect(result.position.replace(/[\{\}]/g, '').split(',')).to.deep.equal(
      newPlayer.position,
    );
    expect(result.imageBuffer).to.equal(newPlayer.imageBuffer);
  });

  it('should be a captain', async () => {
    const result = await playerStore.isCaptain(1);
    expect(result).to.equal(true);
  });

  it('should not be a captain', async () => {
    const result = await playerStore.isCaptain(2);
    expect(result).to.equal(false);
  });

  it('should update a player by id', async () => {
    const updatedPlayer = {
      first_name: 'newfirst',
      lastName: 'newlast',
    };
    const result = await playerStore.update(1, updatedPlayer);
    expect(result.first_name).to.equal('newfirst');
    expect(result.last_name).to.equal('newlast');
  });

  it('should not delete and return null', async () => {
    const result = await playerStore.delete(2);
    expect(result).to.equal(null);
    //expect(playerStore.findAll().length).to.equal(35);
  });

  // Continue with tests for update, delete, etc.
  after(() => {
    pool.end(); // Close the database connection when done
  });
});
