const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const https = require('https');
const fs = require('fs');

const { initDatabase } = require('./db');
const { checkIfUserIsRegistered, registerUser, getUsers } = require('./controllers/userController');
const { loginUser,loadData } = require('./controllers/loginController');
const { addTask, deleteTask, editTask, changeSubtaskCompletion } = require('./controllers/taskController');
const { addGroup, addUserToGroup, deleteUserFromGroup, getUsersOfGroup, deleteGroup, editGroup } = require('./controllers/groupController');

initDatabase();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/isRegistered', checkIfUserIsRegistered);
app.post('/api/login', loginUser);
app.post('/api/loadData', loadData);
app.post('/api/register', registerUser);
app.post('/api/addTask', addTask);
app.post('/api/addGroup', addGroup);
app.post('/api/getUsers', getUsers);
app.post('/api/addUserToGroup', addUserToGroup);
app.post('/api/deleteUserFromGroup', deleteUserFromGroup);
app.post('/api/getUsersOfGroup', getUsersOfGroup);
app.post('/api/deleteGroup', deleteGroup);
app.post('/api/deleteTask', deleteTask);
app.post('/api/editGroup', editGroup);
app.post('/api/editTask', editTask);
app.post('/api/changeSubtaskCompletion', changeSubtaskCompletion);

app.use(express.static(path.join(__dirname, '../client/build')));

const httpsOptions = {
    key: fs.readFileSync('C:/Certbot/live/poganybenedek.asuscomm.com/privkey.pem'), 
    cert: fs.readFileSync('C:/Certbot/live/poganybenedek.asuscomm.com/fullchain.pem') 
};

const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(3001, () => {
    console.log('HTTPS Server listening on port 3001');
});
