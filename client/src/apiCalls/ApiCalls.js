export async function fetchUserData(email, password) {
  const userData = { email: email, password: password };

  try {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function pushUserData(email, password, fullName) {
  const userData = { email: email, password: password, fullName: fullName };

  try {
    const response = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error pushing data:', error);
    throw error;
  }
}

export async function isUserRegistered(email) {
  const userData = { email: email};
  var registered
  try {
    const response = await fetch('http://localhost:3001/api/isRegistered', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const registered = await response.text();
    return registered;
  } 
  catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

