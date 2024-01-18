const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  // Other user fields
});

module.exports = mongoose.model('User', userSchema);
