## OVERVIEW

__You have 3 hours to complete this assessment__

Your mission is to work through each of the included test suites one at a time. If you successfully pass each test, you should have full CRUD routes and database functionality for `Posts` and their nested resource `Comments`.

__It is not necessary to build any client side functionality for this exercise (forms).__

This is a back end only exercise and you will be sending `json` responses from your routes instead of rendering templates. In your routes, simply `res.json` or `redirect` to the proper route.

## Set Up

```sh
npm install -g mocha
npm install
nodemon
```

## Run Tests

```sh
npm test
```

Work through your tests in this order:

1. `test_posts`
1. `test_post_comments`

Work through tests one at a time by removing the `x` from the next `xit`. Each time you pass a test `add, commit, push`.

## Objectives

* Be able to write nested CRUD routes using TDD (Test Driven Development)
* Be able to write RESTful routes
* Be able to write RESTful _nested_ routes
* Be able to use knex with Postgres
* Be able to use knex migrations to create database schemas
* Be able to deploy a CRUD app to Heroku
* Be able to create database schemas on Heroku using migrations

# Your App Should Use:

### Knex Migrations

__POSTS SCHEMA__

```
id
author
body
```
__COMMENTS SCHEMA__

```
id
post_id
commenter
body
```

### Separate Route Files

* `index.js`
* `posts.js`
* `comments.js`
# tdd-crud-breakout
