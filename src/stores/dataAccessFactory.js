const PlayerStore = require('./playerStore.js');
const TeamStore = require('./teamStore.js');

const dataAccessFactory = (() => {
  let stores = {
    playerStore: new PlayerStore(),
    teamStore: new TeamStore(),
  };

  return {
    getDataAccess: function () {
      return stores;
    },
    resetStores: function () {
      stores = {
        playerStore: new PlayerStore(),
        teamStore: new TeamStore(),
      };
    },
  };
})();

module.exports = dataAccessFactory;
