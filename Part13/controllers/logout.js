const router = require('express').Router()

const { ActiveSession } = require('../models')

router.delete('/', async (req, res) => {
  const token = req.session?.jwt
  if (!token) {
    return res.status(400).json({ error: 'not logged in' })
  }

  await ActiveSession.destroy({
    where: { token }
  })

  req.session = null

  res.status(200).json({ message: 'logged out' })
})

module.exports = router