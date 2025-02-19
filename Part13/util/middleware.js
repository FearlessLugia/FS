const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { ActiveSession, User } = require('../models')

const errorHandler = (error, request, response, next) => {
  if (error.name === 'SequelizeValidationError') {
    const messages = error.errors.map(err => err.message)
    return response.status(400).send({ error: messages })
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    const messages = error.errors.map(err => err.message)
    return response.status(400).json({ error: messages })
  } else if (error.name === 'ValidationError') {
    return response.status(404).json({ error: 'Missing parameter' })
  } else if (error.name === 'IdNotFoundError') {
    return response.status(404).json({ error: 'Id Not found' })
  }

  next(error)
}

const tokenExtractor = async (req, res, next) => {
  const token = req.session?.jwt
  if (token) {
    try {
      const decodedToken = jwt.verify(token, SECRET)

      const session = await ActiveSession.findOne({
        where: { token }
      })
      if (!session) {
        return res.status(401).json({ error: 'session not found, please re-login' })
      }

      const user = await User.findByPk(decodedToken.id)
      if (!user || user.disabled) {
        return res.status(403).json({ error: 'user account is disabled' })
      }

      req.decodedToken = decodedToken
      req.user = user
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = { errorHandler, tokenExtractor }