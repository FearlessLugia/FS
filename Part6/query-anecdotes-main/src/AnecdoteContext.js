import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  console.log('state', state)
  console.log('action', action)

  switch (action.type) {
    case 'notification':
      return action.message
    case 'empty':
      return ''
    default:
      return state
  }
}

const AnecdoteContext = createContext()

export const useAnecdoteValue = () => {
  const anecdoteAndDispatch = useContext(AnecdoteContext)
  return anecdoteAndDispatch[0]
}

export const useAnecdoteDispatch = () => {
  const anecdoteAndDispatch = useContext(AnecdoteContext)
  return anecdoteAndDispatch[1]
}

export const AnecdoteContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, 0)

  return (
    <AnecdoteContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </AnecdoteContext.Provider>
  )
}

export default AnecdoteContext