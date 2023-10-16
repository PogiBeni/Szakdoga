import React, { useState } from 'react';

function TodoList({ subTasks, setSubtasks }) {
  const [newTodo, setNewTodo] = useState('');

  const handleTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    const updatedSubtasks = [
      ...subTasks,
      { subtaskName: newTodo, isCompleted: false } 
    ];
    setSubtasks(updatedSubtasks);
    setNewTodo('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTodo();
    }
  };

  const removeTodo = (index) => {
    const updatedSubtasks = [...subTasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  function toggleTodoCompletion(index) {
    const updatedSubtasks = [...subTasks];
    updatedSubtasks[index].isCompleted = !updatedSubtasks[index].isCompleted; 
    setSubtasks(updatedSubtasks);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Add a new sub-task"
        className='form-control mb-2'
        value={newTodo}
        onChange={handleTodoChange}
        onBlur={handleAddTodo}
        onKeyPress={handleKeyPress}
      />
      <ul className='list-group list-group-flush'>
        {subTasks && subTasks.map((subtask, index) => ( 
          <li key={index} className="list-group-item d-flex justify-content-between">
            <div>
              <input
                type="checkbox"
                checked={subtask.isCompleted} 
                onChange={() => toggleTodoCompletion(index)}
              />
              <span className='ms-2' style={{ textDecoration: subtask.isCompleted ? 'line-through' : 'none' }}>
                {subtask.subtaskName} 
              </span>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => removeTodo(index)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
