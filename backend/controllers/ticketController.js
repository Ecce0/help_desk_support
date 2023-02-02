const asyncHandler = require ('express-async-handler')

const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')


//@desc Get user ticket
//@route GET /api/tickets
//@access Private
const getTicket  = asyncHandler( async (req, res) => {
  //get user using ID in JWT
  const user = await User.findById(req.user.id)
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.find({user: req.user.id})

  res.status(200).json(ticket)
})

//@desc Get user ticket
//@route  GET /api/tickets/:id
//@access Private
const getUserTicket  = asyncHandler( async (req, res) => {
  //get user using ID in JWT
  const user = await User.findById(req.user.id)
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)
  if(!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if(ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('not authorized')
  }
  res.status(200).json(ticket)
})

//@desc create new ticket
//@route POST /api/tickets
//@access Private
const createTicket  = asyncHandler( async (req, res) => {
  const { product, description } = req.body

  if(!product || !description) {
    res.status(400)
    throw new Error('Please add a product and description')
  }

  const user = await User.findById(req.user.id)
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new'
  })

  res.status(201).json({ticket})
})


//@desc delete tix
//@route DELETE /api/tickets/:id
//@access Private
const deleteUserTicket  = asyncHandler( async (req, res) => {
  //get user using ID in JWT
  const user = await User.findById(req.user.id)
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)
  if(!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if(ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('not authorized')
  }

  await Ticket.remove()
  res.status(200).json({success: true})
})


//@desc update tix
//@route PUSH /api/tickets/:id
//@access Private
const updateUserTicket  = asyncHandler( async (req, res) => {
  //get user using ID in JWT
  const user = await User.findById(req.user.id)
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)
  if(!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if(ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('not authorized')
  }

   const updatedticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
   res.status(200).json(updatedticket)
})

module.exports = {
  getTicket,
  createTicket,
  getUserTicket,
  deleteUserTicket,
  updateUserTicket
}