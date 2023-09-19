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

    console.log(data);
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

export async function addTask(task) {


  try {
    const response = await axios.post('http://localhost:3001/api/addTask', task, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

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

