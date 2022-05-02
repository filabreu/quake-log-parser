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
- Jest (for tests)

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

### Running the application with Docker

There is a Dockerfile included, so that you don't need to install any dependencies. 

To run the app with Docker, first build the Docker image:

```
docker build -t quake-log-parser .
```

Then run a Docker container with the built image:

```
docker run quake-log-parser
```

### Running tests

To run application tests, first install Jest dependency with NPM:

```
npm install
```

Run Jest tests with NPM script:

```
npm run test
```

### Running tests with Docker

It's also possible to run application tests within the Docker instance, which already have the Jest dependency install.


To run the app tests with Docker, first build the Docker image:

```
docker build -t quake-log-parser .
```

Run Jest tests with NPM script from the Docker container:

```
docker run quake-log-parser npm run test
```
