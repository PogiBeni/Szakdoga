const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const { initDatabase } = require('./db');
const { checkIfUserIsRegistered, registerUser, getUsers } = require('./controllers/userController');
const { loginUser, loadData } = require('./controllers/loginController');
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

// Start a simple HTTP server
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
