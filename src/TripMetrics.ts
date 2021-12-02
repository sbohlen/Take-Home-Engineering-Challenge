import { Boroughs } from './Boroughs';
import { RideType } from './RideType';

export class TripMetrics {
  origin: Boroughs;

  destination: Boroughs;

  rideType: RideType;

  rideHour: number;

  durationAverage: number;

  durationMaximum: number;

  durationMinimum: number;

  costAverage: number;

  costMaximum: number;

  costMinimum: number;
}
