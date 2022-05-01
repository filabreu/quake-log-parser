const LogParser = require('./LogParser');

const parser = new LogParser("./logs/qgames.log");
parser.parse();
