const fs = require('fs');
class LogParser {
  constructor(logfile) {
    try {
      this.data = fs.readFileSync(logfile, "utf8");
    } catch (err) {
      console.error(err);
    };
  }

  parse() {
    return this.data;
  }
}

const parser = new LogParser("./logs/qgames.log");

const parsedData = parser.parse();

console.log(parsedData);
