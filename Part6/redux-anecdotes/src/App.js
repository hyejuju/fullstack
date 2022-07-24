
import { useSelector, useDispatch } from 'react-redux'
import { createStore } from 'redux'
import { useState } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnedoteList from './components/AnecdoteList'

//const store = createStore(anecdoteReducer)

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnedoteList />
      <sd />
      <AnecdoteForm />
    </div>
  ) 
}
 
export default App