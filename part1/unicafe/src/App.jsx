import { useState } from 'react'

const StatLine = (props) => (
  <tr>
    <td>{props.text}</td><td>{props.value}</td>
  </tr>
)

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const HeaderText = props => <h1>{props.text}</h1>

const Statistics = (props) => {
  if (props.values.total === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
        <StatLine text="good" value={props.values.good} />
        <StatLine text="neutral" value={props.values.neutral} />
        <StatLine text="bad" value={props.values.bad} />
        <StatLine text="all" value={props.values.total} />
        <StatLine text="avgerage" value={props.values.avg} />
        <StatLine text="positive" value={props.values.positive} />
      </tbody>
    </table>
  )

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addToGood = () => {
    setGood(good + 1)
  }
  const addToNeutral = () => {
    setNeutral(neutral + 1)
  }
  const addToBad = () => {
    setBad(bad + 1)
  }

  const total = good + bad + neutral
  const avg = (good - bad) / total
  const positive = good/total * 100 + " %"

  const values = {
    good: good,
    bad: bad,
    neutral: neutral,
    total: total,
    avg: avg,
    positive: positive 
  }
  
  return (
    <>
      <HeaderText text="give feedback" />
      <Button handleClick={() => addToGood()} text="good" />
      <Button handleClick={() => addToNeutral()} text="neutral" />
      <Button handleClick={() => addToBad()} text="bad" />
      <HeaderText text="statistics" />
      <Statistics values={values} />      
    </>
  )
}

export default App