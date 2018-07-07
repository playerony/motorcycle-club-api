var db = require('../config/database');

var callCallback = (callback, err, data) => {
  if(err)
    callback(err, null);
  else
    callback(null, data);
}

exports.insert = (username, passwordHash, callback) => {
  let sql = 'INSERT INTO user(username, passwordHash) VALUES(?, ?)';

  db.get().query(sql, [username, passwordHash], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.insertRelation = (userId, roleId, callback) => {
  let sql = 'INSERT INTO user_role(user_id, role_id) VALUES(?, ?)';

  db.get().query(sql, [userId, roleId], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.update = (id, passwordHash, callback) => {
  let sql = 'UPDATE user SET passwordHash = ? WHERE id = ?';

  db.get().query(sql, [passwordHash, id], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.findOneById = (id, callback) => {
  let sql = 'SELECT id, username, passwordHash, addedOn FROM user WHERE id = ?';

  db.get().query(sql, [id], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.findOneByUsername = (username, callback) => {
  let sql = 'SELECT id, username, passwordHash, addedOn FROM user WHERE username LIKE ?';

  db.get().query(sql, [username], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.remove = (id, callback) => {
  let sql = 'DELETE FROM user WHERE id = ?';

  db.get().query(sql, [id], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.removeRelations = (id, callback) => {
  let sql = 'DELETE FROM user_role WHERE user_id = ?';

  db.get().query(sql, [id], (err, rows) => {
    callCallback(callback, err, rows);
  });
}