const { connection } = require('../db');
const bcrypt = require('bcrypt');

function checkIfUserIsRegistered(req, res) {
  const userData = req.body.email;
  console.log('Received data:', userData);

  connection.query("SELECT * FROM user WHERE email = ?", [userData], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    if (results[0]) {
      res.json({ exists: true, id: results[0].id });
    } else {
      res.json({ exists: false });
    }
  });
}

async function registerUser(req, res) {
  const userData = req.body;
  console.log('Received data:', userData);

  try {
    let hashedPassword = "";

    if (userData.password) {
      hashedPassword = await bcrypt.hash(userData.password, 10);
    }

    connection.query(
      "INSERT INTO user (email, password, fullName, linkToPicture) VALUES (?, ?, ?, ?)",
      [userData.email, hashedPassword, userData.fullName, userData.linkToPicture],
      (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Error registering user' });
        }

        connection.query("SELECT * FROM user where email = ?", [userData.email], (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Error registering user' });
          }
          res.json(results[0]);
        });
      }
    );
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: 'Error hashing password' });
  }
}

async function getUsers(req, res) {
  console.log(req.body)
  const userSearchData = req.body;
  console.log(userSearchData.groupId)
  try {
    const searchTerm = `%${userSearchData.query}%`;

    connection.query(
      `SELECT DISTINCT user.id as id, email, fullName, linkToPicture
      FROM user
      LEFT JOIN usertogroup ON usertogroup.userId = user.id
      WHERE (fullName LIKE ? OR email LIKE ?)
            AND (usertogroup.groupId IS NULL OR usertogroup.groupId != ?)
            AND user.id NOT IN (
                SELECT user.id
                FROM user
                LEFT JOIN usertogroup ON usertogroup.userId = user.id
                WHERE (fullName LIKE ? OR email LIKE ?) AND usertogroup.groupId = ?
            )`,
      [searchTerm, searchTerm, userSearchData.groupId, searchTerm, searchTerm, userSearchData.groupId],
      (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Error executing query' });
          return;
        }
        console.log(results)
        res.json(results);
      }
    );
  } catch (error) {
    console.error('Error getting users group', error);
    res.status(500).json({ error: 'Error getting users group' });
  }
}

module.exports = { checkIfUserIsRegistered, registerUser, getUsers };
