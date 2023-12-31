const fs = require('fs');

const { flightFakesCreator, flightsQueriesCreator } = require('./src/flight');
const { airlplanesFakeCreator, airplaneQueriesCreator } = require('./src/airplane');

async function booststrap() {
  let airplanes = [];
  let flights = [];

  for (let i = 0; i < 100; i++) {
    airplanes.push(airlplanesFakeCreator());
  };
  const filteredByLength = airplanes.filter(item => item.model.length <= 10);
  let { airplanesArrayLenght, airplanesQueries} = airplaneQueriesCreator(filteredByLength);

  for (let i = 0; i < 100; i++) {
    flights.push(await flightFakesCreator(airplanesArrayLenght));
  };
  const flightQueries = await flightsQueriesCreator(flights)

  const seedsFolder = './seeds';
  //console.log(!!fs.readdirSync(seedsFolder))
  try {
    fs.readdirSync(seedsFolder)
  } catch {
    fs.mkdirSync(seedsFolder);
  }

  fs.writeFileSync(`${seedsFolder}/airplanes.txt`, airplanesQueries, 'utf-8');
  fs.writeFileSync(`${seedsFolder}/flights.txt`, flightQueries, 'utf-8');
  console.log('running');
}

booststrap();