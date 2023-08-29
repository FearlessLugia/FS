const Book = require('./models/book')
const Author = require('./models/author')
const { GraphQLError } = require('graphql/error')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),

    authorCount: async () => await Author.collection.countDocuments(),

    allAuthors: async () => {
      const authors = await Author.find({})
      return authors.map(a => {
        return {
          name: a.name,
          born: a.born,
          id: a._id,
          bookCount: a.books.length
        }
      })
    },

    allBooks: async (root, args) =>
      // const booksWithAuthor = args.author ? books.filter(b => b.author === args.author) : books
      // return args.genre ? booksWithAuthor.filter(b => b.genres.includes(args.genre)) : booksWithAuthor
      // books
      //   .filter(b => args.author ? b.author === args.author : true)
      //   .filter(b => args.genre ? b.genres.includes(args.genre) : true)
      await Book.find(args.genre ? { genres: { $in: [args.genre] } } : {}).populate('author'),

    me: (root, args, context) => {
      return context.currentUser
    }
  },

  // Author: {
  //   bookCount: async (root) => {
  //     // return books.filter(b => b.author === root.name).length
  //     return Author.books.length
  //   }
  // },

  Mutation: {
    addBook: async (root, args) => {
      // if (!authors.find(a => a.name === args.author)) {
      //   const author = { name: args.author, id: uuid() }
      //   authors = authors.concat(author)
      // }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }

      // const book = { ...args, id: uuid() }
      // books = books.concat(book)
      // return book

      const book = new Book({ ...args, author })
      try {
        await book.save()
        author.books = author.books.concat(book)
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },

    editAuthor: async (root, args) => {
      // const author = authors.find(a => a.name === args.name)
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      // const updatedAuthor = { ...author, born: args.setBornTo }
      // authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      // return updatedAuthor
      author.born = args.setBornTo
      console.log('author', author)

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving born failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      return author
    },

    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers