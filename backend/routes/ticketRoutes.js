const express = require('express')
const router = express.Router()
const { getTicket, createTicket, getUserTicket, deleteUserTicket, updateUserTicket } = require('../controllers/ticketController')

const { protect } = require('../middleware/authMiddleware')

const noteRouter = require('./notesRoutes')

router.use('/:ticketId/notes', noteRouter)
router.route('/').get(protect, getTicket).post(protect, createTicket)

router.route('/:id').get(protect, getUserTicket).delete(protect, deleteUserTicket).put(protect, updateUserTicket)



module.exports = router
