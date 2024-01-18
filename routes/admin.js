// routes/admin.js
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const Admin = require('../models/adminModel');
const User = require('../models/userModel');
const path = require('path');


// Admin login form rendering
router.get('/login', (req, res) => {
  // res.sendFile(__dirname + '../views/login.html');
  res.render("login");
});

// Admin login form submission
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Simple username and password validation (you might want to use bcrypt for secure password hashing)
    const admin = await Admin.findOne({ username, password });

    if (admin) {
      req.session.admin = admin; // Set session
      res.redirect('/admin/dashboard');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Admin dashboard
router.get('/dashboard', requireAuth, async (req, res) => {
  try {
    // Fetch user data for display
    const users = await User.find().limit(2); // Limit to 2 for display limitation
    res.render('admin_dashboard', { users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Other admin routes go here

module.exports = router;

