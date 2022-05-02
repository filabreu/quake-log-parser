class Game {
  constructor(name) {
    this.name = name;
    this.playerMap = {};
    this.killsMap = {};
    this.killsMeansMap = {};
    this.killsMap['<world>'] = 0;

    Game.meansOfDeath.map((_mean, i) => this.killsMeansMap[i] = 0);
  }

  static meansOfDeath = [
    'MOD_UNKNOWN',
    'MOD_SHOTGUN',
    'MOD_GAUNTLET',
    'MOD_MACHINEGUN',
    'MOD_GRENADE',
    'MOD_GRENADE_SPLASH',
    'MOD_ROCKET',
    'MOD_ROCKET_SPLASH',
    'MOD_PLASMA',
    'MOD_PLASMA_SPLASH',
    'MOD_RAILGUN',
    'MOD_LIGHTNING',
    'MOD_BFG',
    'MOD_BFG_SPLASH',
    'MOD_WATER',
    'MOD_SLIME',
    'MOD_LAVA',
    'MOD_CRUSH',
    'MOD_TELEFRAG',
    'MOD_FALLING',
    'MOD_SUICIDE',
    'MOD_TARGET_LASER',
    'MOD_TRIGGER_HURT',
    'MOD_NAIL',
    'MOD_CHAINGUN',
    'MOD_PROXIMITY_MINE',
    'MOD_KAMIKAZE',
    'MOD_JUICED',
    'MOD_GRAPPLE'
  ]

  get totalKills() {
    let killsCount = 0;

    for (let playerId in this.killsMap) {
      killsCount += this.killsMap[playerId];
    }

    return killsCount;
  }

  get players() {
    let playersNames = [];

    for (let playerId in this.playerMap) {
      playersNames.push(this.playerMap[playerId]);
    }

    return playersNames;
  }

  get kills() {
    let killsByPlayer = {};

    for (let playerId in this.killsMap) {
      if (this.playerMap[playerId]) {
        killsByPlayer[this.playerMap[playerId]] = this.killsMap[playerId];
      }
    }

    return killsByPlayer;
  }

  get killsByMeans() {
    let killsByMeansTitle = {};
    
    for (let killMeanId in this.killsMeansMap) {
      if (this.killsMeansMap[killMeanId] > 0) {
        killsByMeansTitle[Game.meansOfDeath[killMeanId]] = this.killsMeansMap[killMeanId];
      }
    };

    return killsByMeansTitle;
  }
}

module.exports = Game;
