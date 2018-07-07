var db = require('../config/database');

var callCallback = (callback, err, data) => {
  if(err)
    callback(err, null);
  else
    callback(null, data);
}

exports.insert = (name, callback) => {
  let sql = 'INSERT INTO role(name) VALUES(?)';

  db.get().query(sql, [name], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.update = (id, name, callback) => {
  let sql = 'UPDATE role SET name = ? WHERE id = ?';

  db.get().query(sql, [name, id], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.findOneById = (id, callback) => {
  let sql = 'SELECT id, name, addedOn FROM role WHERE id = ?';

  db.get().query(sql, [id], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.findOneByName = (name, callback) => {
  let sql = 'SELECT id, name, addedOn FROM role WHERE name = ?';

  db.get().query(sql, [name], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.findRolesByUserId = (userId, callback) => {
  let sql = 'SELECT r.id, r.name, r.addedOn FROM role r JOIN user_role ON roleId = r.id WHERE userId = ?';

  db.get().query(sql, [userId], (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.findAll = (callback) => {
  let sql = 'SELECT id, name, addedOn FROM role';

  db.get().query(sql, (err, rows) => {
    callCallback(callback, err, rows);
  });
}

exports.remove = (id, callback) => {
  let sql = 'DELETE FROM role WHERE id = ?';

  db.get().query(sql, [id], (err, rows) => {
    callCallback(callback, err, rows);
  });
}