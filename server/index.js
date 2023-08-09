const express = require("express");
const mysql = require('mysql');
const app = express();
const PORT = 3001;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'calendarapp'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


app.get("/api", (req, res) => {
  const email = req.query.email;
  console.log(email)
  connection.query("SELECT * FROM user where email like ?", [`%${email}%`], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    res.json(results);
  })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});