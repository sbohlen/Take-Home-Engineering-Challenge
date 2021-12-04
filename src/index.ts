import yargs from 'yargs';
import { Boroughs } from './Boroughs';
// main entry point async IIFE function
import { getTripMetrics } from './getTripMetrics';
import { renderResults } from './renderResults';
import { RideType } from './RideType';

// note: have to pass the value as 'any' b/c if we type it as number
//        we'll never be able to test its type in the function body
function validateRideHour(rideHour: any): boolean {
  return !Number.isNaN(rideHour) && rideHour >= 0 && rideHour <= 23;
}

(async () => {
  const allBoroughs = Object.values(Boroughs);
  const allRideTypes = Object.values(RideType);

  const { argv } = yargs(process.argv.slice(2)).options({
    origin: {
      choices: allBoroughs,
      alias: 'o',
      demandOption: true,
      default: Boroughs.Manhattan,
      description: 'Origin borough',
    },
    destination: {
      choices: allBoroughs,
      alias: 'd',
      demandOption: true,
      default: Boroughs.Manhattan,
      description: 'Destination borough',
    },
    rideHour: {
      type: 'number',
      alias: 'h',
      demandOption: false,
      default: Number.parseInt(
        `${new Date(Date.now()).getHours().toString().padStart(2, '0')}`,
        10,
      ),
      description: 'Hour of the day for the trip (0-23), defaults to NOW',
    },
    rideType: {
      choices: allRideTypes,
      alias: 't',
      demandOption: true,
      default: RideType.YellowCab,
      description: 'Type of vehicle',
    },
  });

  // yargs cannot specify a range for a number or reject NaN values, so we have to do it ourselves
  if (validateRideHour(argv.rideHour)) {
    const results = await getTripMetrics(
      argv.origin,
      argv.destination,
      argv.rideHour,
      argv.rideType,
    );

    renderResults(results);
  } else {
    // TODO: provide richer response/detail on *why* here
    // eslint-disable-next-line no-console
    console.log('Invalid ride hour');
  }
})();
