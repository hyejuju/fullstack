import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const handleAll = (content) => {
        dispatch(createAnecdote(content))
        dispatch(setNotification(`created '${content}'`, 3))
    }
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        handleAll(content)
    }

      return (
        <form onSubmit={addAnecdote}>
            <h2>create new</h2>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
      )
    
}

export default AnecdoteForm