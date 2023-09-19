const pool = require('./database');

module.exports = class playerStore {
  constructor(client) {
    this.client = client || pool;
  }

  async findAll() {
    const { rows } = await this.client.query('SELECT * FROM Players');
    return rows;
  }

  async findById(id) {
    const { rows } = await this.client.query(
      'SELECT * FROM Players WHERE id = $1',
      [id],
    );
    return rows[0] || null;
  }

  async create(player) {
    const { rows } = await this.client.query(
      'INSERT INTO Players (first_name, last_name, birthdate, height, weight, shirt_size, position, comment, pic) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        player.first_name,
        player.last_name,
        player.birthdate,
        player.height,
        player.weight,
        player.shirt_size,
        player.position, // This will be an array ['PG', 'SG']
        player.comment,
        player.pic,
      ],
    );

    return rows[0];
  }

  async delete(id) {
    // Check if the player is a captain
    const isPlayerCaptain = await this.isCaptain(id);

    if (isPlayerCaptain) {
      // If the player is a captain, throw an error or return an error message
      throw new Error('Cannot delete a captain. Assign a new captain first.');
    } else {
      // If the player is not a captain, proceed with the deletion
      console.log('id', id);
      const { rows } = await this.client.query(
        'DELETE FROM Players WHERE id = $1 RETURNING *',
        [id],
      );
      console.log('TESTTTTTT');
      return rows[0] || null;
    }
  }

  async isCaptain(id) {
    const { rows } = await this.client.query(
      'SELECT * FROM Teams WHERE captain_id = $1',
      [id],
    );
    return rows.length !== 0;
  }

  async update(id, updatedPlayer) {
    const { rows } = await this.client.query(
      'UPDATE Players SET first_name = $1, last_name = $2, height = $3 WHERE id = $4 RETURNING *',
      [
        updatedPlayer.playerName,
        updatedPlayer.lastName,
        updatedPlayer.height,
        id,
      ],
    );
    return rows[0];
  }

  async reset() {
    await this.client.query('DELETE FROM Players');
    await this.create({ playerName: 'Player 1', height: 62 });
    await this.create({ playerName: 'Player 2', height: 72 });
    await this.create({ playerName: 'Player 3', height: 82 });
  }
};
