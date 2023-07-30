import axios from 'axios'
import { getId } from '../utils'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, id: getId(), votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (id) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`)
  const updatedAnecdote = { ...anecdote.data, votes: anecdote.data.votes + 1 }
  await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
}


export default { getAll, createNew, voteAnecdote }