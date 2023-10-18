const connection = require('./db'); // Import your database connection

async function createGroup(groupName, creatorUserId, creatorName, description) {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO groups (groupName, creatorUserId, creatorName, description) VALUES (?, ?, ?, ?)',
      [groupName, creatorUserId, creatorName, description],
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

async function getGroupById(groupId) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM groups WHERE id = ?', [groupId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
}

async function updateGroup(group) {
  // Implement an update query for the group
  // Example: 
  // connection.query('UPDATE groups SET groupName = ?, description = ? WHERE id = ?', [group.groupName, group.description, group.id], (err, results) => {...});
}

module.exports = {
  createGroup,
  getGroupById,
  updateGroup,
};
