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
    return null;
  }

  async isCaptain(id) {
    const { rows } = await this.client.query(
      'SELECT * FROM Teams WHERE captain_id = $1',
      [id],
    );
    return rows.length !== 0;
  }

  async update(id, updatedPlayer) {
    // Start building the SQL statement and values array
    let sqlFragments = [];
    let values = [];
    let counter = 1; // This counter will help with the $1, $2, ... placeholders

    // Iterate over the updatedPlayer keys
    for (let key in updatedPlayer) {
      // Convert camelCase to snake_case for database column names
      let dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();

      // Add the SQL fragment and value
      sqlFragments.push(`${dbKey} = $${counter}`);
      values.push(updatedPlayer[key]);
      counter++;
    }

    // Add the player ID to the values array
    values.push(id);

    // Construct the full SQL statement
    const sql = `UPDATE Players SET ${sqlFragments.join(
      ', ',
    )} WHERE id = $${counter} RETURNING *`;

    // Execute the query
    const { rows } = await this.client.query(sql, values);
    return rows[0];
  }
};
