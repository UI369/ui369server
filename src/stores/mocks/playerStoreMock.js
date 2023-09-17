const DataAccessInterface = require('../dataAccessInterface');

let players = [
  {
    id: 1,
    playerName: 'Player 1',
    height: 62,
  },
  {
    id: 2,
    playerName: 'Player 2',
    height: 72,
  },
  {
    id: 3,
    playerName: 'Player 3',
    height: 82,
  },
];

module.exports = class playerStoreMock extends DataAccessInterface {
  findAll() {
    return players;
  }

  findById(id) {
    return (
      players.find((player) => {
        return player.id === id;
      }) || null
    );
  }

  create(player) {
    player.id = players.length + 1;
    players.push(player);
    return player;
  }

  delete(id) {
    const index = players.findIndex((player) => player.id === id);
    if (index === -1) return null;
    const [removed] = players.splice(index, 1);
    return removed;
  }

  clear() {
    return (players = []);
  }

  update(id, updatedPlayer) {
    const index = players.findIndex((player) => player.id === id);
    if (index === -1) return null;
    players[index] = { ...players[index], ...updatedPlayer };
    return players[index];
  }

  reset() {
    players = [
      {
        id: 1,
        playerName: 'Player 1',
        height: 62,
      },
      {
        id: 2,
        playerName: 'Player 2',
        height: 72,
      },
      {
        id: 3,
        playerName: 'Player 3',
        height: 82,
      },
    ];
  }
};
