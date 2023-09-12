let teams = [
  {
    id: 1,
    teamName: 'Team 1',
    players: [
      { playerName: 'Reginald' },
      { playerName: 'Bob' },
      { playerName: 'Mike S.' },
    ],
  },
  {
    id: 2,
    teamName: 'Team 2',
    players: [
      { playerName: 'Archibald' },
      { playerName: 'Stan' },
      { playerName: 'Mike A.' },
    ],
  },
  {
    id: 3,
    teamName: 'Team 3',
    players: [
      { playerName: 'Archibaldo' },
      { playerName: 'Stank' },
      { playerName: 'Mikey A.' },
    ],
  },
];

module.exports = {
  findAll: () => teams,
  findById: (id) => {
    return (
      teams.find((team) => {
        return team.id === id;
      }) || null
    );
  },
  create: (team) => {
    team.id = teams.length + 1;
    teams.push(team);
    return team;
  },
  delete: (id) => {
    const index = teams.findIndex((team) => team.id === id);
    if (index === -1) return null;
    const [removed] = teams.splice(index, 1);
    return removed;
  },
  clear: () => {
    return (teams = []);
  },
  update: (id, updatedTeam) => {
    const index = teams.findIndex((team) => team.id === id);
    if (index === -1) return null;
    teams[index] = { ...teams[index], ...updatedTeam };
    return teams[index];
  },
};
