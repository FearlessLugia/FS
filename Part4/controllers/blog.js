require('dotenv').config()
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  // const token = getTokenFrom(request)
  // const decodedToken = jwt.verify(token, process.env.SECRET)

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }
  // const user = await User.findById(decodedToken.id)

  const user = request.user
  // console.log('user', user)
  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(204).end()
  }

  const user = request.user
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else (
    response.status(401).end()
  )
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter