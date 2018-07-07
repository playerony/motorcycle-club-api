var express = require('express');
var router = express.Router();
var folderService = require('../services/folderService');

router.post('/', function(req, res, next) {
  folderService.insert(req, (response) => {
    res.json(response);
  });
});

router.put('/:id', function(req, res, next) {
  folderService.update(req, (response) => {
    res.json(response);
  });
});

router.get('/:id', function(req, res, next) { 
  folderService.findOneById(req, (response) => {
    res.json(response);
  })
})

router.get('/', function(req, res, next) {
  folderService.findAll((response) => {
    res.json(response);
  })
})

router.delete('/:id', function(req, res, next) {
  folderService.remove(req, (response) => {
    res.json(response);
  });
});

module.exports = router;
