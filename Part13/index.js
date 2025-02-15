const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'SequelizeValidationError') {
    const messages = error.errors.map(err => err.message)
    return response.status(400).send({ error: messages })
  } else if (error.name === 'ValidationError') {
    return response.status(404).json({ error: 'Missing parameter' })
  } else if (error.name === 'IdNotFoundError') {
    return response.status(404).json({ error: 'Id Not found' })
  }

  next(error)
}
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()