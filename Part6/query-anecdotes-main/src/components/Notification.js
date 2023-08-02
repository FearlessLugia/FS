import { useAnecdoteValue } from '../AnecdoteContext'

const Notification = () => {
  const message = useAnecdoteValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (message === 0 || message === '') return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
