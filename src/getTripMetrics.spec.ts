import { Boroughs } from './Boroughs';
import { getTripMetrics } from './getTripMetrics';
import { RideType } from './RideType';

describe('when getting trip metrics', () => {
  const originalBorough = Boroughs.Bronx;
  const destinationBorough = Boroughs.StateIsland;
  const rideType = RideType.GreenCab;
  const rideHour = 10;

  it('should return expected values', async () => {
    const metrics = await getTripMetrics(
      originalBorough,
      destinationBorough,
      rideHour,
      rideType,
    );

    expect(metrics.origin).toEqual(originalBorough);
    expect(metrics.destination).toEqual(destinationBorough);
    expect(metrics.rideType).toEqual(rideType);
    expect(metrics.rideHour).toEqual(rideHour);
    expect(metrics.costAverage).toBeGreaterThan(0);
    expect(metrics.durationAverage).toBeGreaterThan(0);
    expect(metrics.costMaximum).toBeGreaterThan(0);
    expect(metrics.costMinimum).toBeGreaterThan(0);
    expect(metrics.durationMaximum).toBeGreaterThan(0);
    expect(metrics.durationMinimum).toBeGreaterThan(0);
  });
});
