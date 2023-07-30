import { setAnecdotes, vote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state =>
    // state.anecdotes.sort((a, b) => b.votes - a.votes))
    state.anecdotes
      .filter(a => a.content.includes(state.filter))
      .sort((a, b) => b.votes - a.votes)
  )

  const voteOf = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(vote(anecdote.id))
    dispatch(notificationChange(`you voted '${anecdote.content}'`))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => voteOf(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList