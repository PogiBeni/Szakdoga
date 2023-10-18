const userModel = require('../models/userModel');

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.getUserByEmail(email);

    if (!user) {
      res.status(401).json({ message: 'User not found' });
    } else {
      // Check the password
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        // User logged in successfully
        res.json({ id: user.id, fullName: user.fullName, email: user.email });
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    }
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
}

async function register(req, res) {
  const { email, password, fullName, linkToPicture } = req.body;

  try {
    const userId = await userModel.createUser(email, password, fullName, linkToPicture);
    res.json({ id: userId, email, fullName, linkToPicture });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ message: 'An error occurred during registration' });
  }
}

module.exports = {
  login,
  register,
};
