# tcc-registry-api

The registry API is a REST-standard web service for brokering operations such as reading and writing data in a database for the following entities:

 - User;
 - User type;
 - Address;

This project is a software component to compose the proof of concept of the PUC graduation process (TCC).

## API Features

I use Postman to test API endpoints, so a test collection has been exported and can be found in the [postman](./postman/postman_collection.json) directory.

My Postman reference version: v9.15.10

### Data Store

The SGDB is PostgreSQL with PostGIS:

The mechanism used is the Sequelize ORM: https://sequelize.org/docs/v6/

### Location endpoint

 - GET http://&lt;host&gt;:&lt;port&gt;/registry/v1/health
 - GET http://&lt;host&gt;:&lt;port&gt;/registry/v1/user
 - GET http://&lt;host&gt;:&lt;port&gt;/registry/v1/user/:id
 - GET http://&lt;host&gt;:&lt;port&gt;/registry/v1/address/:userId
 - GET http://&lt;host&gt;:&lt;port&gt;/registry/v1/usertype
 - GET http://&lt;host&gt;:&lt;port&gt;/registry/v1/usertype/:id

 - POST http://&lt;host&gt;:&lt;port&gt;/registry/v1/address
 - POST http://&lt;host&gt;:&lt;port&gt;/registry/v1/model

## Installation

 > prerequisites in the development environment:

- node version v12.18.2
- npm version  6.14.15
- postgres/postgis version 13.x

 > steps:

- clone the project
- npm install
- create a database into SGDB
- create and set environment variables, see .env file above
- npm start
- call endpoint to force model creation (see "Location endpoint" session)

### API server configuration

The configuration file called .env must be created in the project root before start the server.

```sh
#.env
NODE_ENV="development"
API_LISTEN_PORT="3000"
DIALECT="postgres"
HOST="192.168.15.36"
PORT="5433"
DB="siga_poc"
USERNAME="postgres"
PASSWORD="postgres"
# *ALL API KEYS HERE ARE UNREAL
```

## Architecture (backend)

- Data access tier: driver, model
- business tier: handler services and class models
- presentation tier: routers and API endpoints

## What remains to improve?

 - unit tests and another tests;
 - exception handlers;
 - logging levels to file;
 - include swagger-ui-express to better API presentation;

## Feedback

If you have any feedback, please reach me at: afacarvalho@yahoo.com.br

## License

See [LICENSE](./LICENSE) file (GNU General Public License).

https://opensource.org/licenses/ISC