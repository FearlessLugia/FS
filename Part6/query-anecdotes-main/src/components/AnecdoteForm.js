import { createAnecdote } from '../request'
import { useMutation } from 'react-query'
import { useAnecdoteDispatch } from '../AnecdoteContext'

const AnecdoteForm = ({ queryClient }) => {
  const dispatch = useAnecdoteDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const Anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', Anecdotes.concat(newAnecdote))
    },
    onError: () => {
      dispatch({ type: 'notification', message: `too short anecdote, must have length 5 or more` })
      setTimeout(() => {
        dispatch({ type: 'empty' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote'/>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
