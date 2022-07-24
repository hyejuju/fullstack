import { createSlice } from '@reduxjs/toolkit'

var timeoutId

export const setNotification = (text, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'notifications/showNotification',
      payload: text
    })
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'notifications/clearNotification'
      })
    }, time * 1000)
  }
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    showNotification(state, action) {
        return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export default notificationSlice.reducer