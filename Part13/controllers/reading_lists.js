const { ReadingList, User, Blog } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const router = require('express').Router()

router.post('/', tokenExtractor, async (req, res) => {
  // const { blogId, userId } = req.body
  // console.log('req.body', req.body)

  // const user = await User.findByPk(req.decodedToken.id)
  // const blog = await Blog.findByPk(blogId)

  const readingList = await ReadingList.create(req.body)
  res.json(readingList)
})

module.exports = router