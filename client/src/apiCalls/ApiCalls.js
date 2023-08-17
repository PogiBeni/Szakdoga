import axios from 'axios';

export async function login(email, password) {
  const userData = { email, password };

  try {
    const response = await axios.post('http://localhost:3001/api/login', userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = response.data;
    return data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Invalid credentials');
    } else {
      throw new Error('Error in API call:'+ error);
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

