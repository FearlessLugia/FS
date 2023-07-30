import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      console.log('action', action)
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      console.log('action', action)
      return action.payload
    },

    setAnecdote(state, action) {
      console.log('action', action)
      const anecdote = action.payload
      return state.map(a => a.id === anecdote.id ? anecdote : a)
    }
  }
})

export const { appendAnecdote, setAnecdotes, setAnecdote } = anecdoteSlice.actions
export const initializeNotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdotes = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdotes))
  }
}
export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.voteAnecdote(id)
    dispatch(setAnecdote(anecdote))
  }
}
export default anecdoteSlice.reducer