import { useDispatch, useSelector } from 'react-redux'
import { notificationClear } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const Notification = () => {
  const notification = useSelector(state => state.notification)

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