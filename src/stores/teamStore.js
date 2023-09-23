const pool = require('./database');

module.exports = class TeamStore {
  constructor(client) {
    this.client = client || pool;
  }

  async findAll() {
    const { rows } = await this.client.query('SELECT * FROM Teams');
    return rows;
  }

  async findById(id) {
    const { rows } = await this.client.query(
      'SELECT * FROM Teams WHERE id = $1',
      [id],
    );
    return rows[0] || null;
  }

  async delete(id) {
    return null;
  }

  async getCaptain(teamId) {
    const { rows } = await this.client.query(
      'SELECT captain_id FROM Teams WHERE id = $1',
      [teamId],
    );
    return rows[0] ? rows[0].captain_id : null;
  }

  // Create function
  async create(newTeam) {
    // Build an SQL statement that can take a newTeam object that uses snake_case or camelCase for property names
    let columns = [];
    let placeholders = [];
    let values = [];
    let counter = 1; // This counter will help with the $1, $2, ... placeholders

    // Iterate over the newTeam keys
    for (let key in newTeam) {
      // Convert camelCase to snake_case for database column names
      let dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();

      // Add the column, placeholder, and value
      columns.push(dbKey);
      placeholders.push(`$${counter}`);
      values.push(newTeam[key]);
      counter++;
    }

    // Construct the full SQL statement
    const sql = `INSERT INTO Teams (${columns.join(
      ', ',
    )}) VALUES (${placeholders.join(', ')}) RETURNING *`;

    // Execute the query
    const { rows } = await this.client.query(sql, values);
    return rows[0];
  }

  async update(id, updatedTeam) {
    // Build an SQL statement that can take an updatedTeam object that uses snake_case or camelCase for property names
    let sqlFragments = [];
    let values = [];
    let counter = 1; // This counter will help with the $1, $2, ... placeholders

    // Iterate over the updatedTeam keys
    for (let key in updatedTeam) {
      // Convert camelCase to snake_case for database column names
      let dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();

      // Add the SQL fragment and value
      sqlFragments.push(`${dbKey} = $${counter}`);
      values.push(updatedTeam[key]);
      counter++;
    }

    // Add the team ID to the values array
    values.push(id);

    // Construct the full SQL statement
    const sql = `UPDATE Teams SET ${sqlFragments.join(
      ', ',
    )} WHERE id = $${counter} RETURNING *`;

    // Execute the query
    const { rows } = await this.client.query(sql, values);

    return rows[0];
  }
};
