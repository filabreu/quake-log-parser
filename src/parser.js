const fs = require('fs');

class Game {
  constructor(name) {
    this.name = name;
    this.playerMap = {};
  }

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
    };

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

      parser.currentGame.playerMap[playerId] = '';
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

  static gamePropertyHandlers = {
    ['InitGame']: this.initGame,
    ['ClientConnect']: this.addPlayer,
    ['ClientUserinfoChanged']: this.changePlayer,
  }

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
  }

  get rows() {
    return this.data.split(/\n/);
  }
}

const parser = new LogParser("./logs/qgames.log");
parser.parse();

console.log(parser.games)
