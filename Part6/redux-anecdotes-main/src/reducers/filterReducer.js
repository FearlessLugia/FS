import { createSlice } from '@reduxjs/toolkit'

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }
const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
      console.log('action', action)
      return action.payload
    }
  }
})

// export const filterChange = filter => {
//   return {
//     type: 'SET_FILTER',
//     payload: filter
//   }
// }

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer