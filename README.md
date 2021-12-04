# Take Home Engineering Challenge

We are a very practical team at Microsoft and this extends to the way that we work with you to find out if this team is a great fit for you. We want you to come away with a great understanding of the work that we actually do day to day and what it is like to work with us.

So instead of coding at a whiteboard with someone watching over your shoulder under high pressure, which is not a thing we often do, we instead discuss code that you have written previously when we meet.

This can be a project of your own or a substantial pull request on a third party project, but some folks have done largely private or proprietary work, and this engineering challenge is for you.

## Guidelines

- This is meant to be an assignment that you spend approximately three hours of dedicated, focused work. Do not feel like you need to overengineer the solution with dozens of hours to impress us. Be biased toward quality over quantity.

- Think of this like an open source project. Create a repo on Github, use git for source control, and use README.md to document what you built for the newcomer to your project.

- Our team builds, alongside our customers and partners, systems engineered to run in production. Given this, please organize, design, test, deploy, and document your solution as if you were going to put into production. We completely understand this might mean you can't do as much in the time budget. Be biased for production-ready over features.

- Think out loud in your submission's documentation. Document tradeoffs, the rationale behind your technical choices, or things you would do or do differently if you were able to spend more time on the project or do it again.

- Our team meets our customers where they are in terms of software engineering platforms, frameworks, tools, and languages. This means you have wide latitude to make choices that express the best solution to the problem given your knowledge and favorite tools. Make sure to document how to get started with your solution in terms of setup.

## The Problem

Getting around large cities can be quite a hassle, and New York City is no exception. One thing that helps, is being able to predict how long a trip might take and how much that trip might cost. Luckily, NYC provides public data about transportation which includes all of the metrics we need!

Your assignment, is to help us quickly look at transportation fare data for tips between different boroughs in NYC so that when we travel there, it is easier for us to get around.

This is a freeform assignment. You can write a web API that returns a set of trip metrics. You can write a web frontend that visualizes the trips and shows cheapest/fastest options. We also spend a lot of time in the shell, so a CLI that gives us a few options would be great. And don't be constrained by these ideas if you have a better one!

The only requirements for the assignment are:

1. We can filter based on yellow cab, green cab, and for-hire vehicle.
2. We can provide a start and end borough for our trip.
3. We can filter based on datetime.
4. The returned data shows some interesting metrics that will help us get around.
5. Your code is well-tested.
6. Documentation is provided for how to build and run your code.

Feel free to tackle this problem in a way that demonstrates your expertise of an area -- or takes you out of your comfort zone. For example, if you build Web APIs by day and want to build a frontend to the problem or a completely different language instead, by all means go for it - learning is a core competency in our group. Let us know this context in your solution's documentation.

New York City transportation data is [located here](https://www1.nyc.gov/site/tlc/about/tlc-trip-record-data.page). We've included a copy of the [Jan 2018 data](https://cseboulderinterview.blob.core.windows.net/triprecord/tripdata.zip) as well.

Good luck! Please send a link to your solution on Github before the day of your interview so we can review it.

---

## One Solution

This project is a reference implementation in [node.js](https://nodejs.org/)/[TypeScript](https://typescriptlang.org/) of **one possible solution** to the aforementioned sample problem.

### Dependencies

Other than the [database setup and configuration](#Database-setup-and-configuration), the only dependency (beyond those included in the project/code itself) is that of the `node.js` runtime (and the accompanying `npm` package manager). This code was developed against the node.js runtime v16.8.0. It has not been tested against either earlier or later versions of node.js, and so attempting to run the code against other versions is left as an experiment for the reader ;)

The project itself has a dependency upon the TypeScript language compiler, but this dependency will be resolved by the `npm` package manager during the steps in the [How-To-Run](#How-to-Run) or [Running Tests](#Running-Tests) sections. TypeScript has been specified as a solution-scoped `npm` package dependency so that it will not conflict with any other pre-installed versions of TypeScript on your system.

In the event of targeting a significantly earlier version of node.js, it may be necessary to adjust the TypeScript transpiler targeting to produce an earlier version of Javascript as identified in the [Typescript and JavaScript compatibility](#Typescript-and-JavaScript-compatibility) section of this doc.

### Typescript and JavaScript compatibility

This project is configured to transpile the TypeScript source files into ECMAscript 2020-compatible Javascript. If a different Javascript compatibility target is desired, you may modify the provided `tsconfig.json` file accordingly. See [What is a tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for more information.

### Database setup and configuration

This project requires an available Microsoft SQL Server for the system to query against into which the collected Taxi/Ride data must first be imported.

To setup the necessary database, perform the following steps:

1. Deploy Microsoft SQL Server 2019 or later [as described here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads). The choice to deploy [Azure SQL](https://azure.microsoft.com/en-us/products/azure-sql/) or on-prem (e.g., licensed, free trial, developer edition, or express edition) is entirely up to you. Each have difference pros and cons, but this project does not require any feature/capability that is unique to any of the various SQL Server product offerings.
1. Create a new database named `takehomechallenge` on the SQL Server.
1. Run the script located in the repository at `./sql/create_tripdata_tables.sql` to create four new tables in the new database as follows:

   | table              | use                                                  | example direct download URL for related source data file                 |
   | ------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------ |
   | `green_tripdata`   | trip data for green cabs                             | <https://s3.amazonaws.com/nyc-tlc/trip+data/green_tripdata_2021-01.csv>  |
   | `yellow_tripdata`  | trip data for yellow cabs                            | <https://s3.amazonaws.com/nyc-tlc/trip+data/yellow_tripdata_2021-01.csv> |
   | `fhv_tripdata`     | trip data for for-hire-vehicles                      | <https://nyc-tlc.s3.amazonaws.com/trip+data/fhv_tripdata_2021-01.csv>    |
   | `taxi_zone_lookup` | zone/borough lookup data referenced by the trip data | <https://s3.amazonaws.com/nyc-tlc/misc/taxi+_zone_lookup.csv>            |

1. Navigate to [the NYC TLC data download page](https://www1.nyc.gov/site/tlc/about/tlc-trip-record-data.page) as [outlined here](#The-Problem) and acquire the necessary files correlated to each of the above four tables.
1. Import the acquired four categories of source data from the TLC data download page into each of the four tables in the database. The naming convention for each of the tables makes it straightforward to relate each table to its correlated category of intended source data.
1. Run the script in the repository at `./sql/build_borough_lookup_table.sql` to create and generate the data for the new `borough_lookup` table in the database
1. Run the script in the repository at `./sql/update_tripdata_tables_with_borough_ids.sql` to update the `*_tripdata` tables with the appropriate values from the `borough_lookup` table.
1. Execute each of the following scripts in the repository to create the tripmetrics tables for each of the three categories of trips/rides:

   | table                                      | use                                |
   | ------------------------------------------ | ---------------------------------- |
   | `./sql/build_green_tripmetrics_table.sql`  | trip metrics for green cabs        |
   | `./sql/build_yellow_tripmetrics_table.sql` | trip metrics for yellow cabs       |
   | `./sql/build_fhv_tripmetrics_table.sql`    | trip metrics for for-hire-vehicles |

   > Note that these three scripts each perform time-consuming/resource-intensive aggregation, lookups, calculations, and other analysis queries over the often-large trip data in each of the trip/ride categories imported in the prior step(s). These queries are undertaken after the data import step(s) to extract meaningful metrics to which the system will subsequently make queries directly at runtime. Depending upon the resource constraints of the system hosting your SQL Server, each of these queries may well require significant time to complete (e.g., anywhere from 2-5 to 10-15+ minutes). Please be patient; this is the conceptual equivalent of building a set of OLAP-friendly de-normalized data structures to accelerate subsequent run-time queries and so this up-front data-ingestion-time investment will pay performance dividends at run-time.

1. On the (usually local) system from which you intend to run the solution to query the database, configure the following environment variables for the desired database connection:

   | environment variable | use                         | example             |
   | -------------------- | --------------------------- | ------------------- |
   | SQL_SERVER_NAME      | SQL Server hostname         | myserver.domain.com |
   | SQL_DATABASE_NAME    | SQL Database name on server | takehomechallenge   |
   | SQL_USERNAME         | username for database       | challengeuser       |
   | SQL_PASSWORD         | password for username       | myPassw@rd          |

   > Note that if you are running this system in an IDE (e.g., VSCode), there is a provided `./.env.template` file that can be leveraged to simulate these same values being provided to the running system via environament variables. To use this, copy the `./.env.template` file to `./.env` and edit its contents accordingly. When the running system detects the presence of this `.env` file, it will use the values found there in place of environment variables.

### How-to-Run

1. install node.js (see [Dependencies](#Dependencies) for node runtime compatibility guidance)
1. clone this repo
1. complete the [database setup and configuration](#Database-setup-and-configuration) steps
1. from the root of the repo, run the command `npm install` to hydrate all required package dependencies
1. from the root of the repo, run the command `npm start` to transpile the TypeScript to Javascript and start the app

### Command-line Arguments

Running the above-referenced `npm start` command will execute the solution with its _default_ arguments. In addition to defaults, the application also accepts command-line parameters to control its behavior. To pass command-line parameters, perform the following steps:

1. complete the steps in the the [How-to-Run](#How-to-Run) section _at least once_; this will produce the transpiled Javascript files in the `./dist/` folder
1. invoke the node runtime and pass it the path to the transpiled `./dist/index.js` file, accompanied by any desired command-line parameters

Example: to display the built-in command-line help to learn about other available command-line parameters, run the following command from the root of the repository (assumes node.js is on your system path):

    node ./dist/index.js --help

The above command-line switch `--help` will display comprehensive usage guidance. Following is a summary of the available command-line parameters:

| flag (full)   | alt. flag (short) | parameter              | example                   | description                                                                                             |
| ------------- | ----------------- | ---------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------- |
| --origin      | -o                | \<originating borough> | --origin "Manhattan"      | trip _originating_ borough, quotes _optional_ unless borough name contains spaces e.g., "Staten Island" |
| --destination | -d                | \<destination borough> | --destination "Manhattan" | trip _destination_ borough, quotes _optional_ unless borough name contains spaces e.g., "Staten Island" |
| --rideHour    | -h                | \<trip-hour>           | --tripHour 17             | hour of the day for the trip using 24-hour clock e.g., 0-23                                             |
| --rideType    | -t                | \<vehicle-type>        | --tripType YellowCab      | type of vehicle for the trip                                                                            |

### Running Tests

1. install node.js (see [Dependencies](#Dependencies) for node runtime compatibility guidance)
1. clone this repo
1. from the root of the repo, run the command `npm install` to hydrate all required package dependencies
1. run one of the following commands as appropriate:

| command                 | intent                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `npm run test`          | run all tests                                                                                                      |
| `npm run test:debug`    | entry point for the VSCode debugger (assumes the repo is open in [the VSCode IDE](https://code.visualstudio.com/)) |
| `npm run test:coverage` | run all tests and provide code-coverage report                                                                     |
| `npm run test:verbose`  | run all tests with maximum verbosity of test-runner output                                                         |

## Contributing

Contributions are always welcome. To contribute to this project, fork the repository, file a new [issue](https://github.com/sbohlen/Take-Home-Engineering-Challenge/issues) correlated to your proposed contribution, and open a new pull request.

Developers please take note of the several 'convenience' `npm` commands already defined in the `package.json` file intended to improve the developer experience (specifically the several `npm run watch:...` commands provided to accelerate the feedback from the developer build-run-test-debug loop).

## Reporting Issues

Issues, bug reports, suggestions, recommendations, etc. are always welcome. Please file a new [issue](https://github.com/sbohlen/bTake-Home-Engineering-Challenge/issues) describing the problem or suggestion in as much detail as possible. In the case of problems/bugs encountered, reporters are encouraged to include sufficient detail to support reproducing the problem/bug if at all possible.

## License

This project is licensed in its entirety under the MIT License. See [LICENSE](https://github.com/sbohlen/Take-Home-Engineering-Challenge/blob/main/LICENSE) file for details.
