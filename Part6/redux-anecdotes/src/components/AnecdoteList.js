
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

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

    const anecdotes = useSelector(state => state).sort((b,a)=>a.votes - b.votes)
 
    return (
        <>
        {anecdotes.map(anecdote =>
            <Anecdote
            anecdote={anecdote}
            vote={()=>
                dispatch(addVote(anecdote.id))}
          />
          )}</>
    )
}

export default AnedoteList

