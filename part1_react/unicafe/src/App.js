import { useState } from 'react'

const Header = ({ text }) => <div> <h1>{text}</h1> </div>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  if (good | bad | neutral) {
    const total = (good + bad + neutral)
    const avg = (good - bad) / total
    const positive = 100 * good / total
    return (
      <table>
        <tbody>
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='all' value={total}/>
          <StatisticLine text='average' value={avg.toFixed(2)}/>
          <StatisticLine text='positive' value={positive.toFixed(2).toString() + '%'}/>
        </tbody>
      </table>
    )
  }
  return (
    <div>No feedback given</div>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  return (
    <div>
      <Header text='give feedback'/>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleBad} text='bad'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Header text='statistics'/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  );
}

export default App;
