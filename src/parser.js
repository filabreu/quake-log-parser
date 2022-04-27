const fs = require('fs');

class Game {
  constructor(name) {
    this.name = name;
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
  }

  parse() {
    return this.games;
  }

  static gameInitMatch = /InitGame/;

  get rows() {
    return this.data.split(/\n/);
  }

  get games() {
    const gamesArr = [];
    let currentGame;

    for (const [i, row] of this.rows.entries()) {
      if (row.match(LogParser.gameInitMatch)) {
        if (currentGame) {
          gamesArr.push(currentGame);
        }
        
        currentGame = new Game(`game_${gamesArr.length+1}`);
        continue;
      }
    }

    return gamesArr;
  }
}

const parsedData = new LogParser("./logs/qgames.log").parse();

console.log(parsedData);
