import * as dotenv from 'dotenv';
import * as mssql from 'mssql';
import { Boroughs } from './Boroughs';
import { RideType } from './RideType';
import { TripMetrics } from './TripMetrics';
import { TripMetricsQueryResult } from './TripMetricsQueryResult';

dotenv.config();

// correlation between rideRype and query source name
const boroughQuerySourceMap: Map<RideType, string> = new Map<
  RideType,
  string
>();
boroughQuerySourceMap.set(RideType.GreenCab, 'green_tripmetrics');
boroughQuerySourceMap.set(RideType.YellowCab, 'yellow_tripmetrics');
boroughQuerySourceMap.set(RideType.ForHireVehicle, 'fhv_tripmetrics');

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
): string {
  // if we dont' have a match, throw b/c there's literally nothing else we can do here
  if (!boroughQuerySourceMap.has(rideType)) {
    throw new Error(`Ride Type ${rideType} is not supported`);
  }

  const tableName = boroughQuerySourceMap.get(rideType);

  // TODO: parameterize the query or rely on SPROC to protect against SQL-injection
  // (see https://github.com/tediousjs/node-mssql#sql-injection)
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

    // TODO: fix this in T-SQL data ingestion scripts and remove the calls to trim()
    //        (this is a code-level fix for a bug in the data: origin and destination
    //        values *sometimes* contain trailing whitespace for reasons TBD)
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

async function doQuery(
  origin: Boroughs,
  destination: Boroughs,
  rideHour: number,
  rideType: RideType,
) {
  await mssql.connect(getConnectionConfig());

  const request = new mssql.Request();

  const result = await request.query(
    buildQuery(origin, destination, rideHour, rideType),
  );

  mssql.close();

  return result;
}

export async function getTripMetrics(
  origin: Boroughs,
  destination: Boroughs,
  rideHour: number,
  rideType: RideType,
): Promise<TripMetricsQueryResult> {
  const result = await doQuery(origin, destination, rideHour, rideType);
  return buildTripMetricsQueryResult(result, rideType);
}
