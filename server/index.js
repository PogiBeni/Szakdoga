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
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  })
})

app.post('/api/login', (req, res) => {
  const userData = req.body;
  console.log('Received data:', userData);

  connection.query("SELECT * FROM user WHERE email = ?", [userData.email], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    const storedHashedPassword = results[0].password;

    bcrypt.compare(userData.password, storedHashedPassword, (compareErr, isMatch) => {
      if (compareErr) {
        console.error('Error comparing passwords:', compareErr);
        res.status(500).json({ message: 'Error comparing passwords' });
        return;
      }

      if (!isMatch) {
        res.status(401).json({ message: 'Invalid password' });
        return;
      }

      res.json(results[0]);
    });
  });
});

app.post('/api/register', async (req, res) => {
  const userData = req.body;
  console.log('Received data:', userData);

  try {
    var hashedPassword
    if(userData.password == null) hashedPassword = ""
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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})