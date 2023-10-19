const { connection } = require('../db');
const bcrypt = require('bcrypt');

async function loginUser(req, res) {
  const userData = req.body;

  try {
    const results = await new Promise((resolve, reject) => {
      
      connection.query("SELECT * FROM user WHERE email = ?", [userData.email], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          reject(err);
          return;
        }

        if (results.length === 0) {
          res.status(401).json({ message: 'User not found' });
          resolve([]);
          return;
        }

        const storedHashedPassword = results[0].password;
        bcrypt.compare(userData.password, storedHashedPassword, (compareErr, isMatch) => {
          if (compareErr) {
            console.error('Error comparing passwords:', compareErr);
            res.status(500).json({ message: 'Error comparing passwords' });
            resolve([]);
            return;
          }

          if (!isMatch) {
            res.status(401).json({ message: 'Invalid password' });
            resolve([]);
            return;
          }

          resolve(results);
        });
      });
    });

    if (results.length === 0) {
      return;
    }

    const user = {
      id: results[0].id,
      loggedIn: true,
      name: results[0].fullName,
      link: results[0].linkToPicture,
      email: results[0].email,
      tasks: [],
      groups: []
    };

    function fetchSubtasks(taskId) {
      return new Promise((resolve, reject) => {
        connection.query(
          'SELECT id, subtaskName, isCompleted FROM subtasks WHERE taskId = ?',
          [taskId],
          (err, results) => {
            if (err) {
              reject(err);
            }
            resolve(results);
          }
        );
      });
    }

    const tasksResults = await new Promise(async (resolve, reject) => {
      connection.query(
        `
    SELECT
      tasks.id as id,
      creatorId,
      tasks.groupId,
      groups.groupName as groupName,
      label,
      taskName,
      color,
      startDate,
      startTime,
      tasks.description,
      usertogroup.userId as userId,
      country,
      cityName,
      streetName,
      notify
    FROM tasks
    LEFT JOIN usertogroup ON usertogroup.groupId = tasks.groupId
    LEFT JOIN groups ON groups.id = usertogroup.groupId
    LEFT JOIN locations ON locationId = locations.id
    WHERE (usertogroup.userId = ?) OR (creatorId = ? AND tasks.groupId IS NULL)
  `,
        [user.id, user.id],
        async (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            reject(err);
            return;
          }

          for (const task of results) {
            task.subtasks = await fetchSubtasks(task.id);
          }

          resolve(results);
        }
      );
    });

    user.tasks = tasksResults;

    const groupsResults = await new Promise((resolve, reject) => {
      connection.query(`SELECT groups.id as id, groupName, creatorUserId, creatorName, description 
                        FROM groups 
                        inner join usertogroup on usertogroup.groupId = groups.id 
                        WHERE usertogroup.userId = ? `,
        [user.id], (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            reject(err);
            return;
          }
          resolve(results);
        });
    });

    user.groups = groupsResults;
    console.log("User:");
    console.log(user);

    res.json(user);
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
}

module.exports = { loginUser };
