var roleRepository = require('../repositories/roleRepository');
var responses = require('../utils/responses');
var schema = require('../schemas/saveRoleSchema');
var validateSchema = require('../utils/jsonValidator').validateSchema;

exports.insert = (req, callback) => {
  let name = req.body.name;
  let validationResult = validateSchema(req.body, schema);

  if(validationResult.length > 0)
    callback(responses.validationError(validationResult))
  else
    roleRepository.findOneByName(name, (err, data) => {
      if(err)
        callback(responses.userError(err));
      else if(data)
        callback(responses.userError(`Role: '${name}' already exist.`));
      else
        roleRepository.insert(name, (err, data) => {
          if(err)
            callback(responses.userError(err));
          else 
            callback(responses.success(data));
        });
    });
}

exports.update = (req, callback) => {
  let id = req.params.id;
  let name = req.body.name;

  roleRepository.findOneById(id, (err, data) => {
    if(err)
      callback(responses.userError(err));
    else if(data.length === 0)
      callback(responses.notFound(`Role with id: '${id}' does not exist.`));
    else
      roleRepository.findOneByName(name, (err, data) => {
        if(err)
          callback(responses.userError(err));
        else if(data)
          callback(responses.userError(`Role: '${name}' already exist.`));
        else 
          roleRepository.update(id, name, (err, data) => {
            if(err)
              callback(responses.userError(err));
            else
              callback(responses.success(`Successful updated role with id: '${id}'.`));
          });
      });
  });
}

exports.findOneById = (req, callback) => {
  let id = req.params.id;

  roleRepository.findOneById(id, (err, data) => {
    if(err)
      callback(responses.userError(err));
    else if(data.length === 0)
      callback(responses.notFound(`Role with id: '${id}' does not exist.`));
    else 
      callback(responses.success(data));
  });
}

exports.findOneByName = (req, callback) => {
  let name = req.params.name;

  roleRepository.findOneByName(name, (err, data) => {
    if(err)
      callback(responses.userError(err));
    else if(data.length === 0)
      callback(responses.notFound(`Role: '${name}' does not exist.`));
    else
      callback(responses.success(data));
  });
}

exports.findRolesByUserId = (req, callback) => {
  let userId = req.params.userId;

  roleRepository.findRolesByUserId(userId, (err, data) => {
    if(err)
      callback(responses.userError(err));
    else if(data.length === 0)
      callback(responses.notFound(`No roles for user with id: '${userId}'.`));
    else 
      callback(responses.success(data));
  });
}

exports.findAll = (callback) => {
  roleRepository.findAll((err, data) => {
    if(err)
      callback(responses.userError(err));
    else 
      callback(responses.success(data));
  });
}

exports.remove = (req, callback) => {
  let id = req.params.id;

  roleRepository.findOneById(id, (err, data) => {
    if(err)
      callback(responses.userError(err));
    else if(data.length === 0)
      callback(responses.notFound(`Role with id: '${id}' does not exist.`));
    else
      roleRepository.remove(id, (err, data) => {
        if(err)
          callback(responses.userError(err));
        else
          callback(responses.success(`Successful deleted user.`));
      });
  });
}