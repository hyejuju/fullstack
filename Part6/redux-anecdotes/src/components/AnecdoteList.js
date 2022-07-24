
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, vote }) => {
    return (
      <div>
       {anecdote.content}
         <div> has {anecdote.votes}</div> 
          <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    )
  }


const AnedoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes).sort((b,a)=>a.votes - b.votes)
 
    const handleAll = (anecdote) => {
        dispatch(addVote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
    }

    return (
        <>
        {anecdotes.map(anecdote =>
            <Anecdote
            anecdote={anecdote}
            vote={()=>handleAll(anecdote) }
          />
          )}</>
    )
}

export default AnedoteList

