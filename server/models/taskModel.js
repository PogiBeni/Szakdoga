const connection = require('./db');

async function createTask(task) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO tasks (creatorId, groupId, taskName, color, startDate, startTime, description, locationId, notify) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
      task.creatorId,
      task.groupId,
      task.taskName,
      task.color,
      task.startDate,
      task.startTime,
      task.description,
      task.locationId,
      task.notify ? 1 : 0, // Convert true/false to 1/0
    ];

    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.insertId);
      }
    });
  });
}

async function getTasksByUserId(userId) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM tasks WHERE creatorId = ?';
    connection.query(query, [userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function updateTask(task) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE tasks SET groupId = ?, taskName = ?, color = ?, startDate = ?, startTime = ?, description = ?, locationId = ?, notify = ? WHERE id = ?';
    const values = [
      task.groupId,
      task.taskName,
      task.color,
      task.startDate,
      task.startTime,
      task.description,
      task.locationId,
      task.notify ? 1 : 0, // Convert true/false to 1/0
      task.id,
    ];

    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.affectedRows > 0);
      }
    });
  });
}

async function deleteTask(taskId) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    connection.query(query, [taskId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.affectedRows > 0);
      }
    });
  });
}

module.exports = {
  createTask,
  getTasksByUserId,
  updateTask,
  deleteTask,
};
