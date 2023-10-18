const connection = require('./db'); 
const bcrypt = require('bcrypt');

async function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
}

async function createUser(email, password, fullName, linkToPicture) {
  return new Promise(async (resolve, reject) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    connection.query(
      'INSERT INTO user (email, password, fullName, linkToPicture) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, fullName, linkToPicture],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.insertId);
        }
      }
    );
  });
}

module.exports = {
  getUserByEmail,
  createUser,
};
