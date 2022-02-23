import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [mostVotedIndex, setMostVotedIndex] = useState(0)
  const initialVotes = {}
  anecdotes.forEach((x, i) => {
    initialVotes[i] = 0
  })
  const [votes, setVotes] = useState(initialVotes)

  const handleClickVote = () => {
    const newValue = votes[selected] + 1
    setVotes({...votes, [selected]: newValue})
    if (votes[mostVotedIndex] <= newValue) {
      setMostVotedIndex(selected)
    }
  }

  const handleClickNext = () => {
    const getRandom = () => Math.floor(Math.random() * anecdotes.length)
    setSelected(getRandom())
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br></br>
      has {votes[selected]} votes<br></br>
      <button onClick={handleClickVote}>vote</button>
      <button onClick={handleClickNext}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotedIndex]}<br></br>
      has {votes[mostVotedIndex]} votes
    </div>
  )
}

export default App