var jwt = require('jsonwebtoken');
var _ = require('lodash');
var responses = require('../utils/responses');
var userService = require('../services/userService');

var verifyJwtToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'secret', (err, decodedToken) => {
      if (err || !decodedToken)
        return reject(err)
      
      resolve(decodedToken)
    })
  })
}

exports.authChecker = (req, res, next) => {
  if (!req.headers.appauthheader || req.headers.appauthheader !== 'MOTORCYCLE-CLUB-API-AUTH-HEADER' || !req.headers.authorization) {
    res.json(responses.unauthorized('Access denied.'));
  } else {
    let token = req.headers.authorization;

    verifyJwtToken(token)
      .then(decodedToken => {
        req.params.username = decodedToken[0].username;

        userService.findOneByUsername(req, (response) => {
          if(response.error === null && response.response !== undefined) {
            var resultArray = Object.values(JSON.parse(JSON.stringify(response)))[1];

            if(decodedToken[0].passwordHash === resultArray[0].passwordHash)
              next();
            else 
              res.json(responses.unauthorized('invalid token'));
          } else
            res.json(response);
        })
      })
      .catch(err => {
        res.json(responses.unauthorized(err.message));
      })
  }
}

exports.createToken = (user) => {
  return jwt.sign(_.omit(user, 'password'), 'secret', { expiresIn: 60*60*5 });
}