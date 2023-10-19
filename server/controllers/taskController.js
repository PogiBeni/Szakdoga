const { connection } = require('../db');

async function addTask(req, res) {
    const { task, location, subtasks } = req.body;
    console.log('Received data:', req.body);

    try {

        const taskInsertResult = await new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO tasks (creatorId, groupId, label, taskName, color, startDate, startTime, description, notify) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [task.creatorId, task.groupId, task.label, task.taskName, task.color, new Date(task.startDate), task.startTime, task.description, task.notify],
                (err, results) => {
                    if (err) {
                        console.error('Error executing query:', err);
                        return reject('Error adding task');
                    }
                    resolve(results.insertId);
                }
            );
        });

        const insertedTaskId = taskInsertResult;

        if (location !== "") {
            const locationInsertResult = await new Promise((resolve, reject) => {
                connection.query(
                    "INSERT INTO locations (country, cityName, streetName, taskId) VALUES (?, ?, ?, ?)",
                    [location.country, location.cityName, location.streetName, insertedTaskId],
                    (err, locationResults) => {
                        if (err) {
                            console.error('Error executing query:', err);
                            return reject('Error adding location');
                        }
                        resolve(locationResults.insertId);
                    }
                );
            });

        }

        const insertedSubtasks = await insertSubtasks(insertedTaskId, subtasks);

        const response = {
            ...task,
            id: insertedTaskId,
            subtasks: insertedSubtasks,
        };

        res.json(response);
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error });
    }
}

async function insertSubtasks(taskId, subtasks) {
    const insertedSubtasks = [];

    for (const subtask of subtasks) {
        const subtaskInsertResult = await new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO subtasks (taskId, subtaskName, isCompleted) VALUES (?, ?, ?)",
                [taskId, subtask.subtaskName, subtask.isCompleted],
                (err, results) => {
                    if (err) {
                        console.error('Error executing subtask query:', err);
                        return reject('Error adding subtask');
                    }
                    resolve({
                        id: results.insertId,
                        subtaskName: subtask.subtaskName,
                        isCompleted: subtask.isCompleted,
                    });
                }
            );
        });

        insertedSubtasks.push(subtaskInsertResult);
    }

    return insertedSubtasks;
}

async function deleteTask(req, res) {
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
}

async function editTask(req, res) {
    const data = req.body;
    console.log(data);

    try {
        connection.query(
            `UPDATE tasks
       SET groupId = ?, label = ?, taskName = ?, color = ?, startDate = ?, startTime = ?, description = ?, locationId = ?
       WHERE id = ?`,
            [
                data.groupId,
                data.label,
                data.taskName,
                data.color,
                data.startDate,
                data.startTime,
                data.description,
                data.locationId,
                data.id,
            ],
            (err, results) => {
                if (err) {
                    console.error('Error updating tasks table:', err);
                    res.status(500).json({ error: 'Error editing task' });
                    return;
                }

                if (data.country) {
                    connection.query(
                        `UPDATE locations
             SET country = ?, cityName = ?, streetName = ?
             WHERE id = ?`,
                        [data.country, data.cityName, data.streetName, data.locationId],
                        (err, locationResults) => {
                            if (err) {
                                console.error('Error updating locations table:', err);
                                res.status(500).json({ error: 'Error editing task' });
                                return;
                            }
                            res.json(true);
                        }
                    );
                } else {
                    res.json(true);
                }
            }
        );
    } catch (error) {
        console.error('Error editing task', error);
        res.status(500).json({ error: 'Error editing task' });
    }
}

async function changeSubtaskCompletion(req, res) {
    const data = req.body;
    console.log(data)
    try {
        connection.query(
            `UPDATE subtasks
      SET isCompleted = ?
      WHERE id = ?`,
            [data.isCompleted, data.id],
            (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'Error changing sibtask completion' });
                    return;
                }
                console.log(results)
                res.json(true);
            }
        );
    } catch (error) {
        console.error('Error deleting group', error);
        res.status(500).json({ error: 'Error changing sibtask completion' });
    }
}

module.exports = { addTask, deleteTask, editTask, changeSubtaskCompletion };
