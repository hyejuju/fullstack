import React from 'react'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer
})

//const store = configureStore(reducer)
const store = configureStore( {reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer
  }})
console.log(store.getState())

export default store