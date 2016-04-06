var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


router.get('/', function(req, res, next) {
  knex('posts').select()
    .then(function(posts){
      res.json({'SUCCESS': posts });
    })
  // Posts().select().then(function (posts) {
  //   res.json({'SUCCESS': posts });
  // })
});

router.post('/', function(req, res, next) {
  knex('posts').insert(req.body)
    .then(function(){
      res.redirect('/posts');
    })
});


module.exports = router;
