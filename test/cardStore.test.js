const chai = require('chai');
const expect = chai.expect;

// Require the module you want to test
const cardsModule = require('../src/stores/cardStore');

describe('Card Module', function () {
  beforeEach(function () {
    // Assuming cards is accessible, reset it before each test
    cardsModule.clear();
  });

  it('should create a card', function () {
    const card = { title: 'Test Card', description: 'Test Description' };
    const result = cardsModule.create(card);
    expect(result).to.eql({ id: 1, ...card });
  });

  it('should find a card by id', function () {
    const card = { title: 'Test Card', description: 'Test Description' };
    cardsModule.create(card);
    const result = cardsModule.findById(1);
    console.log('result');
    console.log(result);
    expect(result).to.eql({ id: 1, ...card });
  });

  it('should find all cards', function () {
    const card1 = { title: 'Test Card1', description: 'Test Description1' };
    const card2 = { title: 'Test Card2', description: 'Test Description2' };
    cardsModule.create(card1);
    cardsModule.create(card2);
    const result = cardsModule.findAll();
    expect(result).to.eql([
      { id: 1, ...card1 },
      { id: 2, ...card2 },
    ]);
  });

  it('should update a card', function () {
    const card = { title: 'Test Card', description: 'Test Description' };
    cardsModule.create(card);
    const updatedCard = {
      title: 'Updated Card',
      description: 'Updated Description',
    };
    const result = cardsModule.update(1, updatedCard);
    expect(result).to.eql({ id: 1, ...updatedCard });
  });

  it('should delete a card', function () {
    const card = { title: 'Test Card', description: 'Test Description' };
    cardsModule.create(card);
    const result = cardsModule.delete(1);
    expect(result).to.eql({ id: 1, ...card });
    expect(cardsModule.findById(1)).to.eql(null);
  });

  it('should return null when trying to find a non-existing card', function () {
    const result = cardsModule.findById(1);
    expect(result).to.be.null;
  });

  it('should return null when trying to update a non-existing card', function () {
    const updatedCard = {
      title: 'Updated Card',
      description: 'Updated Description',
    };
    const result = cardsModule.update(1, updatedCard);
    expect(result).to.be.null;
  });

  it('should return null when trying to delete a non-existing card', function () {
    const result = cardsModule.delete(1);
    expect(result).to.be.null;
  });

  it('should delete all cards', function () {
    const card1 = { title: 'Test Card1', description: 'Test Description1' };
    const card2 = { title: 'Test Card2', description: 'Test Description2' };
    cardsModule.create(card1);
    cardsModule.create(card2);
    const result = cardsModule.findAll();

    expect(cardsModule.clear()).eql([]);
    expect(cardsModule.findAll()).to.eql([]);
  });
});
