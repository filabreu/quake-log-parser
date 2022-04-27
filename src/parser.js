const fs = require('fs');

class Game {
  constructor(name) {
    this.name = name;
    this.playerMap = {};
    this.killsMap = {};
    this.killsMeansMap = {};

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
    return;
  }

  get players() {
    return;
  }

  get kills() {
    return;
  }

  get killsByMeans() {
    return;
  }
}

class LogParser {
  constructor(logfile) {
    try {
      this.data = fs.readFileSync(logfile, "utf8");
    } catch (err) {
      console.error(err);
    }

    this.games = [];
    this.currentGame;
  }

  static initGame(_data, parser) {
    if (parser.currentGame) {
      parser.games.push(parser.currentGame);
    }

    parser.currentGame = new Game(`game_${parser.games.length + 1}`);
  }

  static addPlayer(data, parser) {
    const dataMatch = data.match(/ClientConnect: (\d)/);

    if (dataMatch) {
      const playerId = dataMatch[1];

      parser.currentGame.playerMap[playerId] = "";
      parser.currentGame.killsMap[playerId] = 0;
    }
  }

  static changePlayer(data, parser) {
    const dataMatch = data.match(/ClientUserinfoChanged: (\d) n\\(.*)\\t\\/);

    if (dataMatch) {
      const playerId = dataMatch[1];
      const playerName = dataMatch[2];

      parser.currentGame.playerMap[playerId] = playerName;
    }
  }

  static addKill(data, parser) {
    const dataMatch = data.match(/Kill: (\d) (\d) (\d)/);

    if (dataMatch) {
      const killerId = dataMatch[1];
      const killedId = dataMatch[2];
      const deathMeanId = dataMatch[3];

      if (!parser.currentGame.playerMap[killerId]) {
        parser.currentGame.killsMap[killedId]--;
      } else if (killerId !== killedId) {
        parser.currentGame.killsMap[killerId]++;
        parser.currentGame.killsMeansMap[deathMeanId]++;
      }
    }
  }

  static gamePropertyHandlers = {
    ["InitGame"]: this.initGame,
    ["ClientConnect"]: this.addPlayer,
    ["ClientUserinfoChanged"]: this.changePlayer,
    ["Kill"]: this.addKill,
  };

  static gameParserHandlerMatcher(row, parser) {
    for (const properyMatcher in this.gamePropertyHandlers) {
      if (row.match(properyMatcher)) {
        this.gamePropertyHandlers[properyMatcher](row, parser);
        break;
      }
    }
  }

  parse() {
    for (const [i, row] of this.rows.entries()) {
      LogParser.gameParserHandlerMatcher(row, this);
    }

    console.log(this.games);
  }

  get rows() {
    return this.data.split(/\n/);
  }
}

const parser = new LogParser("./logs/qgames.log");
parser.parse();
