let cards = [];

module.exports = {
  findAll: () => cards,
  create: (card) => {
    card.id = cards.length + 1;
    cards.push(card);
    return card;
  },
  delete: (id) => {
    const index = cards.findIndex((card) => card.id === id);
    if (index === -1) return null;
    const [removed] = cards.splice(index, 1);
    return removed;
  },
  update: (id, updatedCard) => {
    const index = cards.findIndex((card) => card.id === id);
    if (index === -1) return null;
    cards[index] = { ...cards[index], ...updatedCard };
    return cards[index];
  },
};
