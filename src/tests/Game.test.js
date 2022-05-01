const Game = require('../Game');

describe('Game', () => {
  it('initialize new Game with name', () => {
    const game = new Game('My Game');
  
    expect(game.name).toBe('My Game');
  });
});
