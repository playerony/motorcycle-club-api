var express = require('express');
var router = express.Router();
var userService = require('../services/userService');

router.post('/', function(req, res, next) {
  userService.insert(req, (response) => {
    res.json(response);
  });
});

router.put('/:id', function(req, res, next) {
  userService.update(req, (response) => {
    res.json(response);
  });
});

router.get('/id/:id', function(req, res, next) {
  userService.findOneById(req, (response) => {
    res.json(response);
  });
});

router.get('/username/:username', function(req, res, next) {
  userService.findOneByUsername(req, (response) => {
    res.json(response);
  });
});

router.delete('/:id', function(req, res, next) {
  userService.remove(req, (response) => {
    res.json(response);
  });
});

module.exports = router;
