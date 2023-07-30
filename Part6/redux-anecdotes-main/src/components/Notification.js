import { useDispatch, useSelector } from 'react-redux'
import { notificationClear } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(notificationClear())
    }, 5000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [notification, dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification