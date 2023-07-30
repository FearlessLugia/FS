import { useDispatch, useSelector } from 'react-redux'
import { notificationClear } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  setTimeout(() => {
    dispatch(notificationClear())
  }, 5000)

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