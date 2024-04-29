// authMiddleware.js
const jwt = require('jsonwebtoken');
const db = require('../models')

module.exports = async(req, res, next) => {
  // Get the decoded user information from the token
  const {id} =req.params
  const user = await db.User.findById(id)
  console.log(user.role)
  // Check if the user's CNIC matches the admin CNIC
  if (user.cnic === 'admin') {
    // User's CNIC matches admin CNIC, proceed to the next middleware/handler
    next();
  } else {
    // User's CNIC does not match admin CNIC, send a 'Permission denied' error response
    res.status(403).json({ error: 'Permission denied' });
  }
};
