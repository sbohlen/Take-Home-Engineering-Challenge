import { RideType } from './RideType';
import { TripMetricsQueryResult } from './TripMetricsQueryResult';

export function renderResults(result: TripMetricsQueryResult) {
  if (result.hasData) {
    const output = new Array<Array<string>>();

    output.push(['Origin', result.metrics.origin]);
    output.push(['Destination', result.metrics.destination]);
    output.push(['Ride Type', result.metrics.rideType]);
    output.push(['Hour of the day (0-23)', `${result.metrics.tripHour}`]);
    output.push([
      'Average Ride Duration',
      `${result.metrics.durationAverage.toFixed(0)} minutes`,
    ]);
    output.push([
      'Maximum Ride Duration',
      `${result.metrics.durationMaximum.toFixed(0)} minutes`,
    ]);
    output.push([
      'Minimum Ride Duration',
      `${result.metrics.durationMinimum.toFixed(0)} minutes`,
    ]);

    // note: costs are not present in the data for FHVs
    if (result.metrics.rideType !== RideType.ForHireVehicle) {
      output.push([
        'Average Ride Cost',
        `$ ${result.metrics.costAverage.toFixed(2)}`,
      ]);
      output.push([
        'Maximum Ride Cost',
        `$ ${result.metrics.costMaximum.toFixed(2)}`,
      ]);
      output.push([
        'Minimum Ride Cost',
        `$ ${result.metrics.costMinimum.toFixed(2)}`,
      ]);
    }

    output.forEach((entry) => {
      // eslint-disable-next-line no-console
      console.log(`${entry[0].padEnd(22, ' ')} |   ${entry[1]}`);
    });
  }
}
