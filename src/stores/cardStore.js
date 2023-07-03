let cards = [];

module.exports = {
  findAll: () => cards,
  findById: (id) => {
    //return cards.find((card) => card.id === id);
    return (
      cards.find((card) => {
        return card.id === id;
      }) || null
    );
  },
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
  clear: () => {
    return (cards = []);
  },
  update: (id, updatedCard) => {
    const index = cards.findIndex((card) => card.id === id);
    if (index === -1) return null;
    cards[index] = { ...cards[index], ...updatedCard };
    return cards[index];
  },
};
