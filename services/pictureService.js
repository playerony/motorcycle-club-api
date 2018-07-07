var pictureRepository = require('../repositories/pictureRepository');
var folderRepository = require('../repositories/folderRepository');
var userRepository = require('../repositories/userRepository');
var responses = require('../utils/responses');
var schema = require('../schemas/savePictureSchema');
var validateSchema = require('../utils/jsonValidator').validateSchema;

exports.insert = (req, callback) => {
  let title = req.body.title;
  let description = req.body.description;
  let location = req.body.location;
  let userId = req.body.userId;
  let folderId = req.body.folderId;
  let validationResult = validateSchema(req.body, schema);

  if(validationResult.length > 0)
    callback(responses.validationError(validationResult))
  else
    userRepository.findOneById(userId, (err, data) => {
      if(err)
        callback(responses.userError(err));
      else if(data.length === 0)
        callback(responses.notFound(`User with id: '${id}' does not exist.`));
      else
        folderRepository.findOneById(folderId, (err, data) => {
          if(err)
            callback(responses.userError(err));
          else if(data.length === 0)
            callback(responses.notFound(`Folder with id: '${id}' does not exist.`));
          else 
            pictureRepository.insert(title, description, location, folderId, userId, (err, data) => {
              if(err)
                callback(responses.userError(err));
              else 
                callback(responses.success(data));
            });
        });
    });
}

exports.update = (req, callback) => {
  let id = req.params.id;
  let title = req.body.title;
  let description = req.body.description;
  let location = req.body.location;
  let userId = req.body.userId;
  let folderId = req.body.folderId;

  pictureRepository.findOneById(id, (err, data) => {
    if(err)
      callback(responses.userError(err));
    else if(data.length === 0)
      callback(responses.notFound(`Picture with id: '${id}' doesnt exist.`));
    else
      userRepository.findOneById(userId, (err, data) => {
        if(err)
          callback(responses.userError(err));
        else if(data.length === 0)
          callback(responses.notFound(`User with id: '${id}' does not exist.`));
        else
          folderRepository.findOneById(folderId, (err, data) => {
            if(err)
              callback(responses.userError(err));
            else if(data.length === 0)
              callback(responses.notFound(`Folder with id: '${id}' does not exist.`));
            else 
              pictureRepository.update(id, title, description, location, folderId, userId, (err, data) => {
                if(err)
                  callback(responses.userError(err));
                else 
                  callback(responses.success(`Successful updated a picture!`));
              });
          });
      });
  });
}

exports.findOneById = (req, callback) => {
  let id = req.params.id;

  pictureRepository.findOneById(id, (err, data) => {
    if(err)
      callback(responses.userError(err));
    else if(data.length === 0)
      callback(responses.notFound(`Picture with id: '${id}' does not exist.`));
    else 
      callback(responses.success(data));
  });
}

exports.findAllByFolderId = (req, callback) => {
  let folderId = req.params.folderId;

  pictureRepository.findAllByFolderId(folderId, (err, data) => {
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

  pictureRepository.findOneById(id, (err, data) => {
    if(err)
      callback(responses.userError(err));
    else if(data.length === 0)
      callback(responses.notFound(`Picture with id: '${id}' does not exist.`));
    else
      pictureRepository.remove(id, (err, data) => {
        if(err)
          callback(responses.userError(err));
        else
          callback(responses.success(`Successful deleted picture.`));
      });
  });
}