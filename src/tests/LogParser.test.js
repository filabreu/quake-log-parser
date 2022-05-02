const LogParser = require('../LogParser');

describe('LogParser', () => {
  const parser = new LogParser('./src/tests/fixtures/game.log');
  parser.parse();

  beforeEach(() => {
    parser.parse();
  });

  it('initialize new Game instances per InitGame line', () => {
    expect(parser.games.length).toBe(2);
    expect(parser.games[0].name).toBe('game_1');
    expect(parser.games[1].name).toBe('game_2');
  });

  it('add players to each Game instance per ClientConnect line', () => {
    const game_1 = parser.games[0];
    const game_2 = parser.games[1];

    expect(game_1.players.length).toBe(2);
    expect(game_2.players.length).toBe(3);
  });

  it('set player name to each Game instance at each ClientUserinfoChanged line', () => {
    const game_1 = parser.games[0];
    const game_2 = parser.games[1];

    expect(game_1.players[0]).toBe('Player 1');
    expect(game_1.players[1]).toBe('Player 2');
    expect(game_2.players[0]).toBe('Player 1');
    expect(game_2.players[1]).toBe('Player 2');
    expect(game_2.players[2]).toBe('Player 3');
  });

  it('at each Kill line add kill to killer player, decrement player kill if killed by world, bypasses killing self', () => {
    const game_1 = parser.games[0];
    const game_2 = parser.games[1];

    expect(game_1.kills['Player 1']).toBe(2);
    expect(game_1.kills['Player 2']).toBe(1);
    expect(game_2.kills['Player 1']).toBe(3);
    expect(game_2.kills['Player 2']).toBe(1);
    expect(game_2.kills['Player 3']).toBe(0);
  });

  it('at each Kill line add to kill by means count', () => {
    const game_1 = parser.games[0];
    const game_2 = parser.games[1];

    expect(game_1.killsByMeans['MOD_GAUNTLET']).toBe(2);
    expect(game_1.killsByMeans['MOD_MACHINEGUN']).toBe(3);
    expect(game_1.killsByMeans['MOD_SUICIDE']).toBe(2);
    expect(game_2.killsByMeans['MOD_GAUNTLET']).toBe(3);
    expect(game_2.killsByMeans['MOD_MACHINEGUN']).toBe(4);
    expect(game_2.killsByMeans['MOD_GRENADE_SPLASH']).toBe(1);
    expect(game_2.killsByMeans['MOD_SUICIDE']).toBe(4);
  });

  it('sums all valid kills per game, bypassing self kills', () => {
    const game_1 = parser.games[0];
    const game_2 = parser.games[1];

    expect(game_1.totalKills).toBe(5);
    expect(game_2.totalKills).toBe(8);
  });
});
