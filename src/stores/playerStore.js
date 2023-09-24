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

    console.log('sql', sql);
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
    const { sqlFragments, values } =
      this.generateSqlFragmentsAndValues(updatedPlayer);

    // Add the player ID to the values array for the WHERE clause
    values.push(id);

    // Construct the full SQL statement
    const sql = `
        UPDATE Players 
        SET ${sqlFragments.join(', ')} 
        WHERE id = $${values.length} 
        RETURNING *
    `;
    console.log('sql', sql);
    // Execute the query
    const { rows } = await this.client.query(sql.trim(), values);

    return rows[0];
  }

  generateSqlFragmentsAndValues(data) {
    const sqlFragments = [];
    const values = [];

    Object.entries(data).forEach(([key, value], index) => {
      // Convert camelCase to snake_case for database column names
      const dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      const placeholder = `$${index + 1}`;

      sqlFragments.push(`${dbKey} = ${placeholder}`);
      values.push(value);
    });

    return { sqlFragments, values };
  }

  async isCaptain(id) {
    const { rows } = await this.client.query(
      'SELECT * FROM Teams WHERE captain_id = $1',
      [id],
    );
    return rows.length !== 0;
  }
};
