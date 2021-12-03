import { RideType } from './RideType';
import { TripMetrics } from './TripMetrics';

export function renderResults(metrics: TripMetrics) {
  const output = new Array<Array<string>>();

  output.push(['Origin', metrics.origin]);
  output.push(['Destination', metrics.destination]);
  output.push(['Ride Type', metrics.rideType]);
  output.push(['Hour of the day (0-23)', `${metrics.rideHour}`]);
  output.push([
    'Average Ride Duration',
    `${metrics.durationAverage.toFixed(0)} minutes`,
  ]);
  output.push([
    'Maximum Ride Duration',
    `${metrics.durationMaximum.toFixed(0)} minutes`,
  ]);
  output.push([
    'Minimum Ride Duration',
    `${metrics.durationMinimum.toFixed(0)} minutes`,
  ]);

  // note: costs are not present in the data for FHVs
  if (metrics.rideType !== RideType.ForHireVehicle) {
    output.push(['Average Ride Cost', `$ ${metrics.costAverage.toFixed(2)}`]);
    output.push(['Maximum Ride Cost', `$ ${metrics.costMaximum.toFixed(2)}`]);
    output.push(['Minimum Ride Cost', `$ ${metrics.costMinimum.toFixed(2)}`]);
  }

  output.forEach((entry) => {
    console.log(`${entry[0].padEnd(22, ' ')} |   ${entry[1]}`);
  });
}
