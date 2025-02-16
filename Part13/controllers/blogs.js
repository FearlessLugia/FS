const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User } = require('../models')
const { SECRET } = require('../util/config')
const { tokenExtractor } = require('../util/middleware')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if (!req.blog) {
    next({ name: 'IdNotFoundError' })
  }

  next()
}

router.get('/', async (req, res) => {
  let where

  if (req.query.search) {
    where = {
      [Op.or]: {
        title: {
          [Op.iLike]: `%${req.query.search}%`
        },
        author: {
          [Op.iLike]: `%${req.query.search}%`
        }
      }
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  })

  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id, date: new Date() })
  return res.json(blog)
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (req.blog) {
    if (req.blog.userId === user.id) {
      await req.blog.destroy()
    } else {
      res.status(403).json({ error: 'deletion of a blog only possible for the user who added the blog' })
    }
  }
  res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    if (!req.body.likes) {
      throw ({ name: 'ValidationError' })
    }

    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  }
})

module.exports = router
