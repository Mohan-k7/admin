// routes/user.js
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const User = require('../models/userModel');

// User profile update form rendering
router.get('/profile/update', requireAuth, (req, res) => {
  res.sendFile(__dirname + '/views/profile_update.html');
});

// User profile update form submission
router.post('/profile/update', requireAuth, async (req, res) => {
  const { username, password, otherData } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // Update user data
      existingUser.password = password;
      existingUser.otherData = otherData;
      await existingUser.save();

      res.status(200).send('Profile update request submitted for approval');
    } else {
      // Create a new user
      const newUser = new User({ username, password, otherData });
      await newUser.save();

      res.status(200).send('New user created. Profile update request submitted for approval');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Other user routes go here

module.exports = router;
