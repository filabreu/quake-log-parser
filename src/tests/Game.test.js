const Game = require('../Game');

describe('Game', () => {
  const game = new Game('My Game');

  beforeEach(() => {
    game.playerMap['2'] = 'Player 1';
    game.playerMap['4'] = 'Player 2';

    game.killsMap['2'] = 3;
    game.killsMap['4'] = 1;

    game.killsMeansMap[1] = 1;
    game.killsMeansMap[3] = 2;
    game.killsMeansMap[5] = 1;
  });

  it('initialize new Game with name', () => {  
    expect(game.name).toBe('My Game');
  });

  it('shows list of player names', () => {  
    expect(game.players).toEqual(['Player 1', 'Player 2']);
  });

  it('shows kills for each player by name', () => {  
    expect(game.kills).toEqual({ 'Player 1': 3, 'Player 2': 1 });
  });

  it('shows kills by mean of death', () => {
    expect(game.killsByMeans).toEqual({ 'MOD_SHOTGUN': 1, 'MOD_MACHINEGUN': 2, 'MOD_GRENADE_SPLASH': 1 });
  });

  it('counts total kills', () => {
    expect(game.totalKills).toBe(4);
  });
});
