const express = require('express')
const { Todo } = require('../mongo')
const router = express.Router()
const { getAsync, setAsync } = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo)

  const num = (await getAsync('added_todos')) ?? 0
  await setAsync('added_todos', parseInt(num) + 1)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const singleTodo = await req.todo
  res.send(singleTodo)
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const updatedTodo = {
    text: req.body.text,
    done: req.body.done
  }
  const newTodo = await Todo.findByIdAndUpdate(req.todo, updatedTodo)
  res.send(newTodo)
})

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router
