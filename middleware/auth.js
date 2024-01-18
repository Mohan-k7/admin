// middleware/auth.js
const requireAuth = (req, res, next) => {
    // Implement authentication logic here
    if (req.session && req.session.admin) {
      return next();
    } else {
      return res.redirect('/admin/login'); // Redirect to login page if not authenticated
    }
  };
  
  module.exports = { requireAuth };
  
