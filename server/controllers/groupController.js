const { connection } = require('../db');

async function addGroup(req, res) {
    const group = req.body;
    console.log('Received data:', req.body);
    var newId
    try {
        connection.query(
            "INSERT INTO groups (groupName, creatorUserId, creatorName, description) VALUES (?, ?, ?, ?)",
            [group.groupName, group.creatorUserId, group.creatorName, group.description],
            (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'Error adding group' });
                    return;
                }
                newId = results.insertId
                connection.query(
                    "INSERT INTO usertogroup ( userId, groupId) VALUES (?, ?)",
                    [group.creatorUserId, newId],
                    (err, results) => {
                        if (err) {
                            console.error('Error executing query:', err);
                            res.status(500).json({ error: 'Error adding data to another table' });
                            return;
                        }
                        res.json(newId);
                    }
                );
            }
        );
    } catch (error) {
        console.error('Error adding group', error);
        res.status(500).json({ error: 'Error adding task' });
    }
}

async function addUserToGroup(req, res) {
    const data = req.body;
    console.log('Received data:', req.body);
    try {
        connection.query(
            "INSERT INTO usertogroup ( userId, groupId) VALUES (?, ?)",
            [data.userId, data.groupId],
            (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return;
                }
                res.json(true);
            }
        );
    } catch (error) {
        console.error('Error adding group', error);
        res.status(500).json({ error: 'Error adding task' });
    }
}

async function deleteUserFromGroup(req, res) {
    const data = req.body;

    console.log('Delete user from group:');
    console.log('Received data:', req.body);
    console.log(data.groupId);
    try {
        connection.query(
            "DELETE FROM usertogroup WHERE groupId = ? AND userId = ? ",
            [data.groupId, data.userId,],
            (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'Error deleting user from group' });
                    return;
                }
                console.log(results)
                res.json(true);
            }
        );
    } catch (error) {
        console.error('Error deleting user from group', error);
        res.status(500).json({ error: 'Error deleting user from group' });
    }
}

async function getUsersOfGroup(req, res) {
    const data = req.body;
    console.log('getUsersOfGroup');
    console.log('Received data:', req.body);
    try {
        connection.query(
            "SELECT * FROM `usertogroup` INNER JOIN user on user.id = usertogroup.userId WHERE groupId = ?",
            [data.value],
            (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return;
                }
                console.log(results)
                res.json(results);
            }
        );
    } catch (error) {
        console.error('Error getting group', error);
        res.status(500).json({ error: 'Error getting group' });
    }
}

async function deleteGroup(req, res) {
    const data = req.body;

    try {
        connection.query(
            "DELETE FROM groups WHERE id = ?",
            [data.id,],
            (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'Error deleting group' });
                    return;
                }
                console.log(results)
                res.json(true);
            }
        );
    } catch (error) {
        console.error('Error deleting group', error);
        res.status(500).json({ error: 'Error deleting group' });
    }
}

async function editGroup(req, res) {
    const data = req.body;
    console.log(data)
    try {
      connection.query(
        `UPDATE groups
        SET groupName = ?, description = ?
        WHERE id = ?`,
        [data.groupName, data.description, data.id,],
        (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Error deleting group' });
            return;
          }
          console.log(results)
          res.json(true);
        }
      );
    } catch (error) {
      console.error('Error deleting group', error);
      res.status(500).json({ error: 'Error deleting group' });
    }
}
module.exports = { addGroup, addUserToGroup, deleteUserFromGroup, getUsersOfGroup, deleteGroup, editGroup };