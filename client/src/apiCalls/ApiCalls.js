import axios from 'axios';
import { parseISO } from 'date-fns';
const nodeServerUrl = ""

export async function login(email, password) {
  const userData = { email, password };

  try {
    const response = await axios.post('http://localhost:3001/api/login', userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const tasks = response.data.tasks.map(task => ({
      ...task,
      startDate: parseISO(task.startDate),
      endDate: parseISO(task.endDate)
    }));

    const data = {
      ...response.data,
      tasks: tasks 
    };

    return data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Invalid credentials');
    } else {
      throw new Error('Error in API call: ' + error);
    }
  }
}

export async function pushUserData(email, password, fullName, linkToPicture) {
  const userData = { email, password, fullName, linkToPicture };

  try {
    const response = await axios.post('http://localhost:3001/api/register', userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error pushing data:', error);
    throw error;
  }
}

export async function isUserRegistered(email) {
  const userData = { email };

  try {
    const response = await axios.post('http://localhost:3001/api/isRegistered', userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const registered = response.data;
    return registered;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function addTask(taskData) {


  console.log(taskData)
  try {
    const response = await axios.post('http://localhost:3001/api/addTask', taskData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
}

export async function addGroup(group) {

  try {
    const response = await axios.post('http://localhost:3001/api/addGroup',group, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error adding group:', error);
    throw error;
  }
}

export async function getUsers(searchData) {

  try {
    const response = await axios.post('http://localhost:3001/api/getUsers',searchData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data.map((user) => ({
      value: user.id,       // Adjust this based on your data
      name: user.fullName, // Adjust this based on your data
      email: user.email,
      url: user.linkToPicture
    }));
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
}

export async function addUserToGroup(data) {

  try {
    const response = await axios.post('http://localhost:3001/api/addUserToGroup',data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error adding group:', error);
    throw error;
  }
}

export async function getUsersOfGroup(data) {

  try {
    const response = await axios.post('http://localhost:3001/api/getUsersOfGroup',data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error getting members of group:', error);
    throw error;
  }
}

export async function deleteUserFromGroup(data) {

  try {
    const response = await axios.post('http://localhost:3001/api/deleteUserFromGroup',data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error getting members of group:', error);
    throw error;
  }
}

export async function deleteGroup(data) {

  try {
    const response = await axios.post('http://localhost:3001/api/deleteGroup',data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error getting members of group:', error);
    throw error;
  }
}

export async function deleteTask(data) {

  try {
    const response = await axios.post('http://localhost:3001/api/deleteTask',data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error getting members of group:', error);
    throw error;
  }
}
