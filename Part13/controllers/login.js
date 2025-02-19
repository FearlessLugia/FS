const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const { ActiveSession } = require('../models')

router.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  if (user.disabled) {
    return res.status(403).json({ error: 'User account is disabled' })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, SECRET)

  const userInSession = await ActiveSession.findOne({
    where: { userId: user.id }
  })
  if (userInSession) {
    userInSession.token = token
    await userInSession.save()
  } else {
    await ActiveSession.create({
      token,
      userId: user.id
    })
  }

  req.session = {
    jwt: token
  }

  res.status(200).send({
    token,
    username: user.username,
    name: user.name
  })
})

module.exports = router