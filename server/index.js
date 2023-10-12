const express = require("express");
const mysql = require('mysql');
const app = express();
const PORT = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require("bcrypt")

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'calendarapp'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err)
    return
  }
  console.log('Connected to MySQL database')
})

app.post('/api/isRegistered', (req, res) => {
  const userData = req.body
  console.log('Received data:', userData);

  connection.query("SELECT * FROM user where email like '" + userData.email + "'", (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return
    }
    console.log(results)
    if (results[0]) {
      res.json({ exists: true, id: results[0].id });
    } else {
      res.json({ exists: false });
    }
  })
})

app.post('/api/login', async (req, res) => {
  const userData = req.body;

  try {
    const results = await new Promise((resolve, reject) => {
      // Query for user data
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

    // Query for tasks
    const tasksResults = await new Promise((resolve, reject) => {
      connection.query(`SELECT DISTINCT  
                        tasks.id as id,creatorId, tasks.groupId,
                        groups.groupName as groupName ,label,taskName,color,startDate,startTime,tasks.
                        description, usertogroup.userId as userId ,
                        country, cityName, streetName
                        FROM tasks left join usertogroup on usertogroup.groupId = tasks.groupId 
                        left join groups on groups.id = usertogroup.groupId 
                        left join locations on locationId = locations.id
                        WHERE (usertogroup.userId = ?) or (creatorId = ? and tasks.groupId is NULL)`
        , [user.id, user.id], (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            reject(err);
            return;
          }
          resolve(results);
        });
    });
    user.tasks = tasksResults;

    // Query for groups
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
});

app.post('/api/register', async (req, res) => {
  const userData = req.body;
  console.log('Received data:', userData);

  try {
    var hashedPassword
    if (userData.password == null) hashedPassword = ""
    else hashedPassword = await bcrypt.hash(userData.password, 10);

    connection.query(
      "INSERT INTO user (email, password, fullName, linkToPicture) VALUES (?, ?, ?, ?)",
      [userData.email, hashedPassword, userData.fullName, userData.linkToPicture],
      (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          return;
        }

        connection.query("SELECT * FROM user where email = ?", [userData.email], (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            return;
          }
          res.json(results[0]);
        });
      }
    );
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: 'Error hashing password' });
  }
});


app.post('/api/addTask', async (req, res) => {
  const { task, location } = req.body;
  console.log('Received data:', req.body);

  try {
    // Check if locationData is null
    if (location.country === "") {
      connection.query(
        "INSERT INTO tasks (creatorId, groupId, label, taskName, color, startDate, startTime, description, locationId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL)",
        [task.creatorId, task.groupId, task.label, task.taskName, task.color, new Date(task.startDate), task.startTime, task.description],
        (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Error adding task' });
            return;
          }
          res.json({ ...task, id: results.insertId, locationId: null });
        }
      );
    } else {
      // Insert location into the locations table
      connection.query(
        "INSERT INTO locations (country, cityName, streetName) VALUES (?, ?, ?)",
        [location.country, location.cityName, location.streetName],
        (err, locationResults) => {
          if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Error adding location' });
            return;
          }

          const locationId = locationResults.insertId;

          // Insert task data into the tasks table with the locationId
          connection.query(
            "INSERT INTO tasks (creatorId, groupId, label, taskName, color, startDate, startTime, description, locationId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [task.creatorId, task.groupId, task.label, task.taskName, task.color, new Date(task.startDate), task.startTime, task.description, locationId],
            (err, taskResults) => {
              if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Error adding task' });
                return;
              }
              res.json({ ...task, id: taskResults.insertId, locationId });
            }
          );
        }
      );
    }
  } catch (error) {
    console.error('Error adding task', error);
    res.status(500).json({ error: 'Error adding task' });
  }
});


app.post('/api/addGroup', async (req, res) => {
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
});

app.post('/api/getUsers', async (req, res) => {
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
});

app.post('/api/addUserToGroup', async (req, res) => {
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
});

app.post('/api/deleteUserFromGroup', async (req, res) => {
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
});


app.post('/api/getUsersOfGroup', async (req, res) => {
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
});

app.post('/api/deleteGroup', async (req, res) => {
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
});

app.post('/api/deleteTask', async (req, res) => {
  const data = req.body;
  console.log(data)
  try {
    connection.query(
      "DELETE FROM tasks WHERE id = ?",
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
});

app.post('/api/editGroup', async (req, res) => {
  const data = req.body;
  console.log(data)
  try {
    connection.query(
      `UPDATE groups
      SET groupName = ?, description = ?
      WHERE id = ?`,
      [data.groupName,data.description,data.id,],
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
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

