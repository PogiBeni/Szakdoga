import axios from 'axios';
import { parseISO } from 'date-fns';

const nodeServerUrl = 'http://localhost:3001'; 

async function makeRequest(endpoint, data, method = 'post') {
  try {
    const response = await axios[method](`${nodeServerUrl}/api/${endpoint}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error in API call to ${endpoint}:`, error);
    throw error;
  }
}

export async function login(email, password) {
  const userData = { email, password };
  const response = await makeRequest('login', userData);

  const tasks = response.tasks.map((task) => ({
    ...task,
    startDate: parseISO(task.startDate),
  }));

  return { ...response, tasks };
}

export async function pushUserData(email, password, fullName, linkToPicture) {
  const userData = { email, password, fullName, linkToPicture };
  return makeRequest('register', userData);
}

export async function isUserRegistered(email) {
  const userData = { email };
  return makeRequest('isRegistered', userData);
}

export async function addTask(taskData) {
  return makeRequest('addTask', taskData);
}

export async function addGroup(group) {
  return makeRequest('addGroup', group);
}

export async function getUsers(searchData) {
  const response = await makeRequest('getUsers', searchData);
  return response.map((user) => ({
    value: user.id,       
    name: user.fullName,
    email: user.email,
    url: user.linkToPicture,
  }));
}

export async function addUserToGroup(data) {
  return makeRequest('addUserToGroup', data);
}

export async function getUsersOfGroup(data) {
  return makeRequest('getUsersOfGroup', data);
}

export async function deleteUserFromGroup(data) {
  return makeRequest('deleteUserFromGroup', data);
}

export async function deleteGroup(data) {
  return makeRequest('deleteGroup', data);
}

export async function deleteTask(data) {
  return makeRequest('deleteTask', data);
}

export async function editGroup(data) {
  return makeRequest('editGroup', data);
}

export async function editTask(data) {
  return makeRequest('editTask', data);
}

export async function changeSubtaskCompletion(data) {
  return makeRequest('changeSubtaskCompletion', data);
}

export async function loadData(data) {
  const response = await makeRequest('loadData', data);

  const tasks = response.tasks.map((task) => ({
    ...task,
    startDate: parseISO(task.startDate),
  }))
  
  return { ...response, tasks };
}
