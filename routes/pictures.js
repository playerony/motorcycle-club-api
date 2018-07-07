var express = require('express');
var router = express.Router();
var pictureService = require('../services/pictureService');

router.post('/', function(req, res, next) {
  pictureService.insert(req, (response) => {
    res.json(response);
  });
});

router.put('/:id', function(req, res, next) {
  pictureService.update(req, (response) => {
    res.json(response);
  });
});

router.get('/id/:id', function(req, res, next) {
  pictureService.findOneById(req, (response) => {
    res.json(response);
  })
})

router.get('/folderId/:folderId', function(req, res, next) {
  pictureService.findAllByFolderId(req, (response) => {
    res.json(response);
  })
})

router.delete('/:id', function(req, res, next) {
  pictureService.remove(req, (response) => {
    res.json(response);
  });
});

module.exports = router;
