const { Blog } = require('../models')
const { sequelize } = require('../util/db')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('count', sequelize.col('title')), 'articles'],
      [sequelize.fn('sum', sequelize.col('likes')), 'likes']
    ],
    group: 'author'
  })

  res.json(authors)
})

module.exports = router