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
      groups:[]
    };

    // Query for tasks
    const tasksResults = await new Promise((resolve, reject) => {
      connection.query("SELECT * FROM tasks where creatorId = ? ", [user.id], (err, results) => {
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
      connection.query("SELECT * FROM groups where creatorUserId = ? ", [user.id], (err, results) => {
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
  const task = req.body
  console.log('Received data:', task);

  try {
    connection.query(
      "INSERT INTO tasks ( creatorId, groupId, taskName, color, startDate, startTime, endDate, endTime, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [task.creatorId, task.groupId, task.taskName, task.color, task.startDate, task.startTime, task.endDate, task.endTime, task.desc],
      (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          return;
        }
        res.json(true);
      }
    );
  } catch (error) {
    console.error('Error adding task', error);
    res.status(500).json({ error: 'Error adding task' });
  }
});

app.post('/api/addGroup', async (req, res) => {
  const group = req.body;
  console.log('Received data:', req.body);
  try {
    connection.query(
      "INSERT INTO groups ( groupName, color, creatorUserId) VALUES (?, ?, ?)",
      [group.groupName, group.groupColor, group.creatorUserId],
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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

