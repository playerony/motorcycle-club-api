var db = require('../config/database');

var callCallback = (callback, err, data) => {
  if(err)
    callback(err, null);
  else
    callback(null, data);
}

exports.insert = (title, description, userId, callback) => {
  let sql = 'INSERT INTO folder(title, description, userId) VALUES(?, ?, ?)';

  db.get().query(sql, [title, description, userId], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.update = (id, title, description, userId, callback) => {
  let sql = 'UPDATE folder SET title = ?, description = ?, userId = ? WHERE id = ?';

  db.get().query(sql, [title, description, userId, id], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.findOneById = (id, callback) => {
  let sql = 'SELECT id, title, description, userId, addedOn FROM folder WHERE id = ?';

  db.get().query(sql, [id], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.findAll = (callback) => {
  let sql = 'SELECT id, title, description, userId, addedOn FROM folder';

  db.get().query(sql, (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.remove = (id, callback) => {
  let sql = 'DELETE FROM folder WHERE id = ?';

  db.get().query(sql, [id], (err, rows) => {
    callCallback(callback, err, rows);
  });
}