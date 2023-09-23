const pool = require('./database');

module.exports = class PlayerStore {
  constructor(client) {
    this.client = client || pool;
  }

  async findAll() {
    const { rows } = await this.client.query('SELECT * FROM players');
    return rows;
  }

  async findById(id) {
    const { rows } = await this.client.query(
      'SELECT * FROM players WHERE id = $1',
      [id],
    );

    return rows[0] || null;
  }

  async create(newPlayer) {
    // Build an SQL statement that can take a newPlayer object that uses snake_case or camelCase for property names
    let columns = [];
    let placeholders = [];
    let values = [];
    let counter = 1; // This counter will help with the $1, $2, ... placeholders

    // Iterate over the newPlayer keys
    for (let key in newPlayer) {
      // Convert camelCase to snake_case for database column names
      let dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();

      // Add the column, placeholder, and value
      columns.push(dbKey);
      placeholders.push(`$${counter}`);
      values.push(newPlayer[key]);
      counter++;
    }

    // Construct the full SQL statement
    const sql = `INSERT INTO Players (${columns.join(
      ', ',
    )}) VALUES (${placeholders.join(', ')}) RETURNING *`;

    // Execute the query
    const { rows } = await this.client.query(sql, values);

    return rows[0];
  }

  delete(id) {
    return null;
  }

  generateSQLFragments(id, queryObject) {
    // Build an SQL statement that can take an updatedPlayer object that uses snake_case or camelCase for property names
    let sqlFragments = [];
    let values = [];
    let counter = 1; // This counter will help with the $1, $2, ... placeholders

    // Iterate over the updatedPlayer keys
    for (let key in queryObject) {
      // Convert camelCase to snake_case for database column names
      let dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();

      // Add the SQL fragment and value
      sqlFragments.push(`${dbKey} = $${counter}`);
      values.push(queryObject[key]);
      counter++;
    }
    values.push(id);

    return { sqlFragments, values };
  }

  // Update function
  async update(id, updatedPlayer) {
    const { columns, placeholders, values } =
      this.prepareSqlFragmentsAndValues(updatedPlayer);

    // Construct the full SQL statement
    const sqlFragments = columns.map(
      (col, index) => `${col} = ${placeholders[index]}`,
    );
    values.push(id);

    const sql = `UPDATE Players SET ${sqlFragments.join(', ')} WHERE id = $${
      placeholders.length + 1
    } RETURNING *`;

    // Execute the query
    const { rows } = await this.client.query(sql, values);

    return rows[0];
  }

  async isCaptain(id) {
    const { rows } = await this.client.query(
      'SELECT * FROM Teams WHERE captain_id = $1',
      [id],
    );
    return rows.length !== 0;
  }

  // Helper function to prepare SQL fragments and values
  prepareSqlFragmentsAndValues(data) {
    let columns = [];
    let placeholders = [];
    let values = [];
    let counter = 1; // This counter will help with the $1, $2, ... placeholders

    // Iterate over the data keys
    for (let key in data) {
      // Convert camelCase to snake_case for database column names
      let dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();

      // Add the column, placeholder, and value
      columns.push(dbKey);
      placeholders.push(`$${counter}`);
      values.push(data[key]);
      counter++;
    }

    return { columns, placeholders, values };
  }
};
