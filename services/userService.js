var userRepository = require('../repositories/userRepository');
var roleRepository = require('../repositories/roleRepository');
var responses = require('../utils/responses');
var schema = require('../schemas/saveUserSchema');
var validateSchema = require('../utils/jsonValidator').validateSchema;
var bcrypt = require('bcrypt');
var createToken = require('../utils/authUtils').createToken;

exports.insert = (req, callback) => {
  let username = req.body.username;
  let password = req.body.password;
  let validationResult = validateSchema(req.body, schema);

  if(validationResult.length > 0)
    callback(responses.validationError(validationResult))
  else
    userRepository.findOneByUsername(username, (err, data) => {
      if(err)
        callback(responses.userError(err));
      else if(data.length === 0)
        callback(responses.userError(`User: '${username}' already exist.`));
      else 
        roleRepository.findOneByName('USER', (err, data) => {
          if(err)
            callback(responses.userError('There was unexpected problem during fetching a role.'));
          else if(data.length === 0)
            callback(responses.notFound(`Can not find details about 'USER' role.`));
          else
            bcrypt.hash(password, 10, (err, result) => {
              let role = data[0];

              userRepository.insert(username, result, (err, data) => {
                if(err)
                  callback(responses.userError(err));
                else 
                  userRepository.insertRelation(data.insertId, role.id, (err, data) => {
                    if(err)
                      callback(responses.userError(err));
                    else 
                      callback(responses.success(data));
                  });
              });
            });
        });
    });
}

exports.update = (req, callback) => {
  let password = req.body.password;
  let id = req.params.id;

  userRepository.findOneById(id, (err, data) => {
    if(err)
      callback(responses.userError(err));
    else if(!data)
      callback(responses.notFound(`User with id: ${id} does not exist.`));
    else
      bcrypt.compare(data.passwordHash, password, (err, result) => {
        if(err)
          callback(responses.userError(err));
        if(result)
          callback(responses.unauthorized('User is unauthorized.'));
        else
          bcrypt.hash(password, 10, (err, result) => {
            userRepository.update(id, result, (err, data) => {
              if(err)
                callback(responses.userError(err));
              else 
                callback(responses.success(`Successful updated user.`));
            });
          });
      });
  });
}

exports.findOneById = (req, callback) => {
  let id = req.params.id;

  userRepository.findOneById(id, (err, data) => {
    let user = data;

    if(err)
      callback(responses.userError(err));
    if(data.length === 0)
      callback(responses.notFound(`User with id: '${id}' does not exist.`));
    else 
      roleRepository.findRolesByUserId(id, (err, data) => {
        if(err)
          callback(responses.userError(err));
        if(data.length === 0)
          callback(responses.notFound(`User does not have any role.`));
        else {
          let d = user[0];
          d.roles = data;

          callback(responses.success(d));
        }
      });
  });
}

exports.findOneByUsername = (req, callback) => {
  let username = req.params.username;

  userRepository.findOneByUsername(username, (err, data) => {
    if(err)
      callback(responses.userError(err));
    else if(data.length === 0)
      callback(responses.notFound(`User: '${username}' does not exist.`));
    else 
      callback(responses.success(data));
  });
}

exports.remove = (req, callback) => {
  let id = req.params.id;

  userRepository.findOneById(id, (err, data) => {
    if(err)
      callback(responses.userError(err));
    else if(data.length === 0)
      callback(responses.notFound(`User with id: '${id}' does not exist.`));
    else
      userRepository.remove(id, (err, data) => {
        if(err)
          callback(responses.userError(err));
        else
          userRepository.removeRelations(id, (err, data) => {
            if(err)
              callback(responses.userError(err));
            else
              callback(responses.success(`Successful deleted user.`));
          });
      });
  });
}

exports.login = (req, callback) => {
  let username = req.body.username;
  let password = req.body.password;

  userRepository.findOneByUsername(username, (err, user) => {
    if(err)
      callback(responses.userError(err));
    else if(!user)
      callback(responses.notFound(`User: ${username} does not exist.`));
    else {
      if(user.length > 0) {
        bcrypt.compare(user[0].passwordHash, password, (err, result) => {
          if(err)
            callback(responses.userError(err));
          else if(result)
            callback(responses.unauthorized('User is unauthorized.'));
          else
            callback(responses.success(createToken(user)));
        });
      } else {
        callback(responses.unauthorized('User is unauthorized.'));
      }
    }
  });
}