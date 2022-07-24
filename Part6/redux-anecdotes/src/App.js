

import AnecdoteForm from './components/AnecdoteForm'
import AnedoteList from './components/AnecdoteList'
import Notification from './components/Notification'

//const store = createStore(anecdoteReducer)

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnedoteList />
      <sd />
      <AnecdoteForm />
    </div>
  ) 
}
 
export default App