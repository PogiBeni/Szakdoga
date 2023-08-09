const express = require("express");
const mysql = require('mysql');
const app = express();
const PORT = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');

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

app.post('/api/data', (req, res) => {
  const userData = req.body
  console.log('Received data:', userData);

  connection.query("SELECT * FROM user where email like '"+ userData.email + "' and password like '"+ userData.password+"' limit 1", (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return
    }
    console.log('Sent data:', results[0]);
    res.json(results[0])
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})