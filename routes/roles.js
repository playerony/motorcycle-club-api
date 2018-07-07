var express = require('express');
var router = express.Router();
var roleService = require('../services/roleService');

router.post('/', function(req, res, next) {
  roleService.insert(req, (response) => {
    res.json(response);
  });
});

router.put('/:id', function(req, res, next) {
  roleService.update(req, (response) => {
    res.json(response);
  });
});

router.get('/id/:id', function(req, res, next) {
  roleService.findOneById(req, (response) => {
    res.json(response);
  })
})

router.get('/name/:name', function(req, res, next) {
  roleService.findOneByName(req, (response) => {
    res.json(response);
  })
})

router.get('/userId/:userId', function(req, res, next) {
  roleService.findRolesByUserId(req, (response) => {
    res.json(response);
  })
})

router.get('/', function(req, res, next) {
  roleService.findAll((response) => {
    res.json(response);
  })
})

router.delete('/:id', function(req, res, next) {
  roleService.remove(req, (response) => {
    res.json(response);
  });
});

module.exports = router;
