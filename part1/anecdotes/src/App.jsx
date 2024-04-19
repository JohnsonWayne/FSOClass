import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Display = (props) => (
  <p>{props.text}</p>
)

const Header = (props) => (
  <h1>{props.text}</h1>
)

const DisplayVotes = (props) => (
  <p>has {props.text} votes</p>
)

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const anecdotesLength = anecdotes.length
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotesLength).fill(0))
  const [maxVoteIdx, setMaxVote] = useState(0)

  const getRandom = () => {
    return Math.floor(Math.random() * anecdotesLength)
  }

  const updateSelected = () => {
    const idx = getRandom()
    setSelected(idx)
  }

  const updateVotes = (selected) => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    if (updatedVotes[selected] > votes[maxVoteIdx]) {
      setMaxVote(selected)
    }
    setVotes(updatedVotes)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Display text={anecdotes[selected]} />
      <DisplayVotes text={votes[selected]} />
      <Button handleClick={() => updateVotes(selected)} text="vote" />      
      <Button handleClick={() => updateSelected()} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <Display text={anecdotes[maxVoteIdx]} />
      <DisplayVotes text={votes[maxVoteIdx]} />
    </div>
  )
}

export default App