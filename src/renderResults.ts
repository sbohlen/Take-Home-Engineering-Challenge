/* eslint-disable no-console */
import { RideType } from './RideType';
import { TripMetricsQueryResult } from './TripMetricsQueryResult';

function renderData(result: TripMetricsQueryResult) {
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

  // note: costs are only present in the data for YELLOW and GREEN cabs
  if (
    result.metrics.rideType === RideType.YellowCab ||
    result.metrics.rideType === RideType.GreenCab
  ) {
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
    console.log(`${entry[0].padEnd(22, ' ')} |   ${entry[1]}`);
  });
}

function renderNoData() {
  console.log('No data found for the specified query');
}

export function renderResults(result: TripMetricsQueryResult) {
  if (result.hasData) {
    renderData(result);
  } else {
    renderNoData();
  }
}
