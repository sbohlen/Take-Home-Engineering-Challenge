import * as dotenv from 'dotenv';
import * as mssql from 'mssql';
import { Boroughs } from './Boroughs';
import { RideType } from './RideType';
import { TripMetrics } from './TripMetrics';
import { TripMetricsQueryResult } from './TripMetricsQueryResult';

dotenv.config();

function getConnectionConfig() {
  return {
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER_NAME,
    database: process.env.SQL_DATABASE_NAME,
    port: 1433,
    options: {
      encrypt: false,
      trustServerCertificate: false,
    },
  };
}

function buildQuery(
  origin: Boroughs,
  destination: Boroughs,
  rideHour: number,
  rideType: RideType,
): any {
  let tableName: string;

  switch (rideType) {
    case RideType.GreenCab:
      tableName = 'green_tripmetrics';
      break;

    case RideType.YellowCab:
      tableName = 'yellow_tripmetrics';
      break;

    case RideType.ForHireVehicle:
      tableName = 'fhv_tripmetrics';
      break;

    default:
      throw new Error('Invalid Ride Type');
  }

  return `SELECT * FROM ${tableName}
            WHERE origin = '${origin}'
            AND destination = '${destination}'
            AND tripHour = ${rideHour}`;
}

function buildTripMetricsQueryResult(
  result: any,
  rideType: RideType,
): TripMetricsQueryResult {
  const tripMetricsQueryResult = new TripMetricsQueryResult();

  if (result.rowsAffected[0] === 1) {
    const metrics = new TripMetrics();

    metrics.origin = result.recordset[0].origin.trim();
    metrics.destination = result.recordset[0].destination.trim();
    metrics.tripHour = result.recordset[0].tripHour;
    metrics.rideType = rideType;

    metrics.durationMaximum = 100 - Math.random() * 10;
    metrics.durationMinimum = Math.random() * 10;
    metrics.durationAverage = Number.parseFloat(
      (Math.random() * 100).toFixed(2),
    );

    // only YELLOW and GREEN cabs have cost data available
    if (
      metrics.rideType === RideType.GreenCab ||
      metrics.rideType === RideType.YellowCab
    ) {
      metrics.costMaximum = 100.0 - Math.random() * 10;
      metrics.costMinimum = Math.random() * 10;
      metrics.costAverage = Number.parseFloat((Math.random() * 100).toFixed(2));
    }

    tripMetricsQueryResult.metrics = metrics;
    tripMetricsQueryResult.hasData = true;
  }

  return tripMetricsQueryResult;
}

export async function getTripMetrics(
  origin: Boroughs,
  destination: Boroughs,
  rideHour: number,
  rideType: RideType,
): Promise<TripMetricsQueryResult> {
  await mssql.connect(getConnectionConfig());

  const request = new mssql.Request();

  const result = await request.query(
    buildQuery(origin, destination, rideHour, rideType),
  );

  mssql.close();

  const tripMetricsQueryResult = buildTripMetricsQueryResult(result, rideType);

  return tripMetricsQueryResult;
}
