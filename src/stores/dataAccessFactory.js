const PlayerStoreMock = require('./mocks/playerStoreMock.js');
const PlayerStore = require('./playerStore.js');

const TeamStoreMock = require('./mocks/teamStoreMock.js');
const TeamStore = require('./teamStore.js');

const dataAccessFactory = (() => {
  let stores;
  if (process.env.USE_MOCK_DATA === 'true') {
    stores = {
      playerStore: new PlayerStoreMock(),
      teamStore: new TeamStoreMock(),
    };
  } else {
    stores = {
      playerStore: new PlayerStore(),
      teamStore: new TeamStore(),
    };
  }

  return {
    getDataAccess: function () {
      return stores;
    },
    resetStores: function () {
      if (process.env.USE_MOCK_DATA === 'true') {
        stores = {
          playerStore: new PlayerStoreMock(),
          teamStore: new TeamStoreMock(),
        };
      } else {
        stores = {
          playerStore: new PlayerStore(),
          teamStore: new TeamStore(),
        };
      }
    },
  };
})();

module.exports = dataAccessFactory;
