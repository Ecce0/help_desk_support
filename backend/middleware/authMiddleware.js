const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      //this will get the token
      token = req.headers.authorization.split(' ')[1]
      //this will verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      //and this will get user from the token provided
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (err) {
      console.log(err)
      res.status(401)
      throw new Error('Not authorized')
    }


  } 
  
  if(!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
})

module.exports = { protect }