// dataAccessInterface.js
module.exports = class DataAccessInterface {
  findAll() {}
  findById(id) {}
  create(data) {}
  delete(id) {}
  clear() {}
  update(id, updatedPlayer) {}
};

// mockDataAccess.js
const DataAccessInterface = require('./dataAccessInterface');

module.exports = class MockDataAccess extends DataAccessInterface {
  findAll() {
    // Return mock data
  }
  // ... implement other methods using mock data
};

// databaseDataAccess.js
const DataAccessInterface = require('./dataAccessInterface');

module.exports = class DatabaseDataAccess extends DataAccessInterface {
  findAll() {
    // Query the database and return results
  }
  // ... implement other methods using the database
};

// dataAccessFactory.js
const MockDataAccess = require('./mockDataAccess');
const DatabaseDataAccess = require('./databaseDataAccess');

module.exports = function getDataAccess() {
  if (process.env.USE_MOCK_DATA === 'true') {
    return new MockDataAccess();
  } else {
    return new DatabaseDataAccess();
  }
};
