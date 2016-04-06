process.env.NODE_ENV = 'test';

var chai = require('chai');
var assert = require('assert');
var knex = require('../../db/knex');

it('should use knex migrations', function () {
return knex('knex_migrations').select().then(function (migrations) {
  assert.equal(migrations.length, 2);
  })
})
