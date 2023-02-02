const express = require('express')
const app = express()
const PORT = process.env.PORT || 7000
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const path = require('path')


require('colors')
require('dotenv').config()


//Connection to DB
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
  res.status(200).send('Help Desk API')
})



//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))


//for the build folder since it'll be static
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => res.sendFile(__dirname, '../','frontend', 'build', 'index.html'))
} else {
  app.get('/', (req, res) => {
    res.status(200).send('Help Desk API')
  })
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`server listening on ${PORT}`))