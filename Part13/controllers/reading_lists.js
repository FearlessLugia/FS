const { ReadingList, User, Blog } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const router = require('express').Router()

router.post('/', async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.findByPk(req.body.blogId)

  if (!user || !blog) {
    return res.status(400).json({ error: 'User or Blog not found' })
  }

  const existingReadingList = await ReadingList.findOne({
    where: {
      userId: user.id,
      blogId: blog.id
    }
  })

  if (existingReadingList) {
    return res.status(400).json({ error: 'Blog & User already in reading list' })
  }

  const readingList = await ReadingList.create(req.body)
  res.json(readingList)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id)
  if (readingList) {
    readingList.read = req.body.read
    await readingList.save()
    res.json(readingList)
  } else {
    res.status(404).end()
  }
})

module.exports = router