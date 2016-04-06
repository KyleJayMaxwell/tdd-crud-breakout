process.env.NODE_ENV = 'test';


var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
var should = chai.should();
var server = require('../../app');
var knex = require('../../db/knex');
chai.use(chaiHttp);


describe('Post Comments CRUD Routes', function() {
  beforeEach(function () {
    return knex.seed.run(knex.config);
  });
  xit('should GET ALL comments for a post on /posts/:post_id/comments', function (done) {
    chai.request(server)
    .get('/posts').end(function (err, res) {
      var thePost=res.body.SUCCESS[1];
      chai.request(server)
      .get('/posts/'+thePost.id+'/comments')
      .end(function(err, response){
        response.should.have.status(200);
        response.body.SUCCESS.should.have.length(2);
        response.body.SUCCESS[0].should.have.property('post_id');
        response.body.SUCCESS[0].should.have.property('commenter');
        response.body.SUCCESS[0].should.have.property('body');
        done();
      });
    })
  });
  xit('should POST a post comment to /posts/:post_id/comments', function(done) {
    var theComment = {
      'commenter': 'Oscar Wilde',
      'body': 'Be yourself; everyone else is already taken.'
    }
    chai.request(server)
      .get('/posts').end(function (err, res) {
        var thePost = res.body.SUCCESS[0];
        chai.request(server)
          .post('/posts/'+thePost.id+'/comments')
          .send(theComment)
          .end(function(err, response){
            response.should.have.status(200);
            // EXPECTING REDIRECT TO /posts/:post_id/comments
            response.body.SUCCESS.should.have.length(2);
            done();
          });
      })
    });
  xit('should GET a SINGLE post comment from /posts/:post_id/comments/:id', function(done) {
    chai.request(server)
      .get('/posts').end(function (err, res) {
        var thePost = res.body.SUCCESS[1];
        chai.request(server).get('/posts/'+thePost.id+'/comments')
        .end(function (err, response) {
          var theComment = response.body.SUCCESS[0];
          chai.request(server)
          .get('/posts/'+thePost.id+'/comments/'+theComment.id)
          .end(function(err, results){
            results.should.have.status(200);
            results.body.should.be.a('object');
            results.body.SUCCESS.commenter.should.equal(theComment.commenter);
            results.body.SUCCESS.body.should.equal(theComment.body);
            done();
          });
        })
      })
    });
    xit('should GET post comment EDIT route /posts/:post_id/comments/:id/edit', function (done) {
      chai.request(server).get('/posts').end(function (err, res) {
        var thePost = res.body.SUCCESS[1];
        chai.request(server).get('/posts/'+thePost.id+'/comments')
        .end(function(err, results){
          var theComment = results.body.SUCCESS[1];
          chai.request(server).get('/posts/'+thePost.id+'/comments/'+theComment.id+'/edit').end(function (err, response) {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.SUCCESS.commenter.should.equal(theComment.commenter);
            response.body.SUCCESS.body.should.equal(theComment.body);
            done();
          })
        });
      })
    });
    xit('should UPDATE a post comment to /posts/:post_id/comments/:id', function(done) {
      chai.request(server)
        .get('/posts').end(function (err, res) {
          var thePost = res.body.SUCCESS[1];
          chai.request(server).get('/posts/'+thePost.id+'/comments')
          .end(function (err, response) {
            var theComment = response.body.SUCCESS[0];
            chai.request(server)
            .put('/posts/'+thePost.id+'/comments/'+theComment.id)
            .send({commenter: 'Kurt Donald Cobain'})
            .end(function(err, results){
              results.should.have.status(200);
              // EXPECTING REDIRECT TO /posts/:post_id/comments
              results.body.SUCCESS.should.have.length(2);
              done();
            });
          })
        })
    });
    xit('should DELETE a post comment to /posts/:post_id/comments/:id', function(done) {
      chai.request(server)
        .get('/posts').end(function (err, res) {
          var thePost = res.body.SUCCESS[1];
          chai.request(server).get('/posts/'+thePost.id+'/comments')
          .end(function (err, response) {
            var theComment = response.body.SUCCESS[0];
            chai.request(server)
            .delete('/posts/'+thePost.id+'/comments/'+theComment.id)
            .end(function(err, results){
              results.should.have.status(200);
              results.body.SUCCESS.should.have.length(1);
              done();
            });
          })
        })
    });
});
