var express = require('express');
var router = express.Router();
var userService = require('../services/userService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'motorcycle-club-api' });
});

router.post('/login', (req, res, next) => {
  userService.login(req, (response) => {
    res.json(response);
  });
})

module.exports = router;
