require('dotenv').load();

module.exports = {


  // test database
  test: {
    client: 'sqlite3',
    connection: {
      filename: 'test.sqlite'
    },
    seeds: {
      directory: './db/seeds/tests'
    },
    migrations: {
      directory: './db/migrations/tests'
    }
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/posts_development',
    seeds: {
      directory: './db/seeds/dev'
    },
    migrations: {
      directory: './db/migrations/dev'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};
