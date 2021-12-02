import { Boroughs } from './Boroughs';
import { RideType } from './RideType';
import { TripMetrics } from './TripMetrics';

export async function getTripMetrics(
  origin: Boroughs,
  destination: Boroughs,
  rideHour: number,
  rideType: RideType,
): Promise<TripMetrics> {
  /*
  * TODO: eventually query the RDBMS for the trip metrics within the specified time window
           for the specified ride type; for now, just provide reasonable random values
  */

  const metrics = new TripMetrics();

  metrics.origin = origin;
  metrics.destination = destination;
  metrics.rideHour = rideHour;
  metrics.rideType = rideType;

  metrics.costMaximum = 100.0 - Math.random() * 10;
  metrics.costMinimum = Math.random() * 10;
  metrics.costAverage = Number.parseFloat((Math.random() * 100).toFixed(2));

  metrics.durationMaximum = 100 - Math.random() * 10;
  metrics.durationMinimum = Math.random() * 10;
  metrics.durationAverage = Number.parseFloat((Math.random() * 100).toFixed(2));

  return metrics;
}
