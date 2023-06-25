var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((s, p) => s + p.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const favoriteBlog = blogs.find(item =>
    item.likes === Math.max(...blogs.map(item => item.likes)))
  // return {
  //   title: favoriteBlog.title,
  //   author: favoriteBlog.author,
  //   likes: favoriteBlog.likes
  // }
  return _.pick(favoriteBlog, ['title', 'author', 'likes'])
}

const mostBlogs = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author')

  const authorWithMostBlogs = _.maxBy(Object.entries(blogsByAuthor),
    ([, blogs]) => blogs.length)

  if (authorWithMostBlogs) {
    const [author, blogs] = authorWithMostBlogs
    return {
      author,
      blogs: blogs.length
    }
  }
  return null
}

const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author')

  const authorWithMostLikes = _.maxBy(Object.entries(blogsByAuthor),
    ([, blogs]) => _.sumBy(blogs, 'likes'))

  if (authorWithMostLikes) {
    const [author, blogs] = authorWithMostLikes
    return {
      author,
      likes: _.sumBy(blogs, 'likes')
    }
  }
  return null
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }