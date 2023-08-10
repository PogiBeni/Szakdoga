const express = require("express");
const mysql = require('mysql');
const app = express();
const PORT = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

app.use(cors());
app.use(bodyParser.json());
const salt = crypto.randomBytes(16).toString('hex');

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

app.post('/api/login', (req, res) => {
  const userData = req.body
  console.log('Received data:', userData);
  const hash = crypto.pbkdf2Sync(userData.password, salt, 100000, 64, 'sha256').toString('hex');
    
  connection.query("SELECT * FROM user where email like '"+ userData.email + "' and password like '"+ hash +"'", (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return
    }
    res.json(results[0])
  })
})

app.post('/api/isRegistered', (req, res) => {
  const userData = req.body
  console.log('Received data:', userData);

  connection.query("SELECT * FROM user where email like '"+ userData.email +"'", (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return
    }
    console.log(results)
    if(results[0]) res.send(true)
    else return res.send(false)
  })
})

app.post('/api/register', (req, res) => {
  const userData = req.body
  console.log('Received data:', userData);
  if(!userData) return
  const hash = crypto.pbkdf2Sync(userData.password, salt, 100000, 64, 'sha256').toString('hex');

  connection.query("INSERT INTO user VALUES ('','"+ userData.email +"','"+ hash +"','"+userData.fullName+"','"+userData.linkToPicture+"')", (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return
    }
    console.log(hash)
    connection.query("SELECT * FROM user where email like '"+ userData.email + "' and password like '"+ hash+"'", (err, results) => {
      if (err) {
        console.error('Error executing query:', err)
        return
      }
      console.log(results[0].email)
      res.json(results[0])
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})