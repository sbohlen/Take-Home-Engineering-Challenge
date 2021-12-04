import { Boroughs } from './Boroughs';
import { getTripMetrics } from './getTripMetrics';
import { RideType } from './RideType';

// TODO: mock the underlying database calls to avoid brittle state dependencies in these tests

describe('when requesting AVAILABLE trip metrics', () => {
  const originalBorough = Boroughs.Bronx;
  const destinationBorough = Boroughs.Manhattan;
  const rideType = RideType.YellowCab;
  const rideHour = 4;

  it('should return expected metrics', async () => {
    const result = await getTripMetrics(
      originalBorough,
      destinationBorough,
      rideHour,
      rideType,
    );

    expect(result.hasData).toBeTruthy();
    expect(result.metrics.origin).toEqual(originalBorough);
    expect(result.metrics.destination).toEqual(destinationBorough);
    expect(result.metrics.rideType).toEqual(rideType);
    expect(result.metrics.tripHour).toEqual(rideHour);
    expect(result.metrics.costAverage).toBeGreaterThan(0);
    expect(result.metrics.durationAverage).toBeGreaterThan(0);
    expect(result.metrics.costMaximum).toBeGreaterThan(0);
    expect(result.metrics.costMinimum).toBeGreaterThan(0);
    expect(result.metrics.durationMaximum).toBeGreaterThan(0);
    expect(result.metrics.durationMinimum).toBeGreaterThan(0);
  });
});

describe('when requesting UNAVAILABLE trip metrics', () => {
  const originalBorough = Boroughs.Bronx;
  const destinationBorough = Boroughs.StateIsland;
  const rideType = RideType.YellowCab;
  const rideHour = 4;

  it('should return expected none-found flags', async () => {
    const result = await getTripMetrics(
      originalBorough,
      destinationBorough,
      rideHour,
      rideType,
    );

    expect(result.hasData).toBeFalsy();
  });
});
