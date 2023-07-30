import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },

    vote(state, action) {
      console.log('action', action)
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }

      anecdoteService.voteAnecdote(id)

      return state.map(a => a.id !== id ? a : votedAnecdote)
    },

    appendAnecdote(state, action) {
      console.log('action', action)
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      console.log('action', action)
      return action.payload
    }
  }
})

export const { createAnecdote, vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer