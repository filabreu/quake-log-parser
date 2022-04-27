### Quake 3 game log parser

This small app will parse a Quake 3 log file and output some data relevant to each game logged:

- List of players and their names
- Count of kills by each player
- Count of death by each mean of death

### Dependencies

This solution is made with Javascript and NodeJS. It was tested with NodeJS 16.3.1.
Any version above 12.x.x should be compatible.

- NodeJS 12.13.x or above (NodeJS 16.3.1 recommended);
- NPM (packed with NodeJS)

### Running the application

There is a npm script to run the application:

```
npm run start
```

Alternatively, you can also use Yarn, if you prefer:

```
yarn start
```

The application will print the parsed game data in the screen
