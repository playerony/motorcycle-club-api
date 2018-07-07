var userRepository = require('../repositories/userRepository');
var folderRepository = require('../repositories/folderRepository');
var responses = require('../utils/responses');
var schema = require('../schemas/saveFolderSchema');
var validateSchema = require('../utils/jsonValidator').validateSchema;

exports.insert = (req, callback) => {
  let title = req.body.title;
  let description = req.body.description;
  let userId = req.body.userId;
  let validationResult = validateSchema(req.body, schema);

  if(validationResult.length > 0)
    callback(responses.validationError(validationResult))
  else
    userRepository.findOneById(userId, (err, data) => {
      if(err)
        callback(responses.userError(err));
      else if(data.length === 0)
        callback(responses.notFound(`User with id: '${userId}' doesnt exist.`));
      else
        folderRepository.insert(title, description, userId, (err, data) => {
          if(err)
            callback(responses.userError(err));
          else 
            callback(responses.success(data));
        });
    });
}

exports.update = (req, callback) => {
  let id = req.params.id;
  let title = req.body.title;
  let description = req.body.description;
  let userId = req.body.userId;

  folderRepository.findOneById(id, (err, data) => {
    if(err)
      callback(responses.userError(err));
    else if(data.length === 0)
      callback(responses.notFound(`Folder with id: '${id}' does not exist.`));
    else
      userRepository.findOneById(userId, (err, data) => {
        if(err)
          callback(responses.userError(err));
        else if(data.length === 0)
          callback(responses.notFound(`User with id: '${id}' does not exist.`));
        else
          folderRepository.update(id, title, description, userId, (err, data) => {
            if(err)
              callback(responses.userError(err));
            else 
              callback(responses.success(`Successful updated a folder.`));
          });
      });
  });
}

exports.findOneById = (req, callback) => {
  let id = req.params.id;

  folderRepository.findOneById(id, (err, data) => {
    if(err)
      callback(responses.userError(err));
    else if(data.length === 0)
      callback(responses.notFound(`Folder with id: '${id}' does not exist.`));
    else 
      callback(responses.success(data));
  });
}

exports.findAll = (callback) => {
  folderRepository.findAll((err, data) => {
    if(err)
      callback(responses.userError(err));
    else if(data.length === 0)
      callback(responses.notFound(`There are no pictures for this folder.`));
    else 
      callback(responses.success(data));
  });
}

exports.remove = (req, callback) => {
  let id = req.params.id;

  folderRepository.findOneById(id, (err, data) => {
    if(err)
      callback(responses.userError(err));
    else if(data.length === 0)
      callback(responses.notFound(`Folder with id: '${id}' does not exist.`));
    else
      folderRepository.remove(id, (err, data) => {
        if(err)
          callback(responses.userError(err));
        else
          callback(responses.success(`Successful deleted folder.`));
      });
  });
}