const router = require('express').Router()

const { User } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({
    where: {
      username
    }
  })

  if (user) {
    user.name = req.body.name
    await user.save()
    return res.json(user)
  }

  return res.status(404).end()
})

module.exports = router