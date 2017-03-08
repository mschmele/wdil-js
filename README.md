# wdil

"Who did it last?" - an eventual web app for tracking household tasks, chores, etc.

## Development

### Requirements

* Node 7.6+ (for native async/await)
*

### Stack Summary

`wdil` is composed of a Node.js `server` and a React.js `client` application (bootstrapped with create-react-app). The `server` interfaces with a MySQL database for persistence, and uses `knex` as an interface/query builder to that database.

### Up and Running

```bash
# Install dependencies
$ yarn

# Start the local MySQL container (you can run your own local MySQL if you'd rather)
$ docker-compose up -d

# Start the server and client processes simultaenously
$ yarn start-dev

# Start only the server
$ yarn server

# Start only the client
$ yarn client

# Run database migrations
$ yarn migrate
```
### Environment Variables

This application uses environment variables for configuration. Place a `.env` file in the root of your project to load environment variables. Here's a sample

```
DB_HOST=127.0.0.1
DB_USER=wdil
DB_PASSWORD=wdil
DB_SCHEMA=wdil
NODE_ENV=development
PORT=3001
```

The database environment variables should match what's listed in `docker-compose.yml` or otherwise denote a user/database that exists in your local MySQL server.
