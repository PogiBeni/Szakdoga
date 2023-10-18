const mysql = require('mysql');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'calendarapp'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); 
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
