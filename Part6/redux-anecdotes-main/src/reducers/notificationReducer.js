import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      console.log('action', action)
      return action.payload
    },

    notificationClear(state, action) {
      return ''
    }
  }
})

export const { notificationChange, notificationClear } = notificationSlice.actions
export const setNotification = (content, timer) => {
  return async dispatch => {
    dispatch(notificationChange(content))

    setTimeout(() => {
      dispatch(notificationClear())
    }, timer)
  }
}
export default notificationSlice.reducer