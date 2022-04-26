const fs = require('fs');

fs.readFile('./logs/qgames.log', 'utf8', (err, data) => {
  if (err) {
    console.error(err);

    return;
  }

  const gameInfo = {};

  console.log(data);
});
