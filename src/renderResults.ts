import { TripMetrics } from './TripMetrics';

export function renderResults(metrics: TripMetrics) {
  const output = new Map<string, string>();

  output.set('Origin', metrics.origin);
  output.set('Destination', metrics.destination);
  output.set('Ride Type', metrics.rideType);
  output.set('Hour of the day (0-23)', `${metrics.rideHour}`);
  output.set(
    'Average Ride Duration',
    `${metrics.durationAverage.toFixed(0)} minutes`,
  );
  output.set(
    'Maximum Ride Duration',
    `${metrics.durationMaximum.toFixed(0)} minutes`,
  );
  output.set(
    'Minimum Ride Duration',
    `${metrics.durationMinimum.toFixed(0)} minutes`,
  );
  output.set('Average Ride Cost', `$ ${metrics.costAverage.toFixed(2)}`);
  output.set('Maximum Ride Cost', `$ ${metrics.costMaximum.toFixed(2)}`);
  output.set('Minimum Ride Cost', `$ ${metrics.costMinimum.toFixed(2)}`);

  output.forEach((value, key) => {
    console.log(`${key.padEnd(22, ' ')} |   ${value}`);
  });
}
