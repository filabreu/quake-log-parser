const fs = require('fs');
const Game = require('./Game');

class LogParser {
  constructor(logfile) {
    try {
      this.data = fs.readFileSync(logfile, "utf8");
    } catch (err) {
      console.error(err);
    }

    this.games = [];
  }

  static initGame(_data, parser) {
    parser.games.push(new Game(`game_${parser.games.length + 1}`));
  }

  static addPlayer(data, parser) {
    const dataMatch = data.match(/ClientConnect: (\d+)/);

    if (dataMatch) {
      const playerId = dataMatch[1];

      parser.currentGame.playerMap[playerId] = "";
      parser.currentGame.killsMap[playerId] = 0;
    }
  }

  static changePlayer(data, parser) {
    const dataMatch = data.match(/ClientUserinfoChanged: (\d+) n\\(.*)\\t\\/);

    if (dataMatch) {
      const playerId = dataMatch[1];
      const playerName = dataMatch[2];

      parser.currentGame.playerMap[playerId] = playerName;
    }
  }

  static addKill(data, parser) {
    const dataMatch = data.match(/Kill: (\<world\>|\d+) (\d+) (\d+)/);

    if (dataMatch) {
      const killerId = dataMatch[1];
      const killedId = dataMatch[2];
      const deathMeanId = dataMatch[3];

      if (!parser.currentGame.playerMap[killerId]) {
        parser.currentGame.killsMap[killerId]++;
        parser.currentGame.killsMap[killedId]--;
        parser.currentGame.killsMeansMap[deathMeanId]++;
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
    this.games = [];

    for (const [i, row] of this.rows.entries()) {
      LogParser.gameParserHandlerMatcher(row, this);
    }

    console.log(JSON.stringify(this.output, null, 2));
  }

  get rows() {
    return this.data.split(/\n/);
  }

  get currentGame() {
    return this.games.slice(-1)[0];
  }

  get output() {
    const outputMap = {};

    this.games.forEach((game) => {
      outputMap[game.name] = {
        total_kills: game.totalKills,
        players: game.players,
        kills: game.kills,
        kills_by_means: game.killsByMeans
      }
    })

    return outputMap;
  }
}

module.exports = LogParser;
