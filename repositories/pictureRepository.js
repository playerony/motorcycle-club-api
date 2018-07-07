var db = require('../config/database');

var callCallback = (callback, err, data) => {
  if(err)
    callback(err, null);
  else
    callback(null, data);
}

exports.insert = (title, description, location, folderId, userId, callback) => {
  let sql = 'INSERT INTO picture(title, description, location, folderId, userId) VALUES(?, ?, ?, ?, ?)';

  db.get().query(sql, [title, description, location, folderId, userId], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.update = (id, title, description, location, folderId, userId, callback) => {
  let sql = 'UPDATE picture SET title = ?, description = ?, location = ?, folderId = ?, userId = ? WHERE id = ?';

  db.get().query(sql, [title, description, location, folderId, userId, id], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.findOneById = (id, callback) => {
  let sql = 'SELECT id, title, description, location, folderId, userId, addedOn FROM picture WHERE id = ?';

  db.get().query(sql, [id], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.findAllByFolderId = (folderId, callback) => {
  let sql = 'SELECT id, title, description, location, folderId, userId, addedOn FROM picture WHERE folderId = ?';

  db.get().query(sql, [folderId], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.remove = (id, callback) => {
  let sql = 'DELETE FROM picture WHERE id = ?';

  db.get().query(sql, [id], (err, rows) => {
    callCallback(callback, err, rows);
  });
}