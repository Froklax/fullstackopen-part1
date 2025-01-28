import { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  <Title text='statistics' />

  if (total === 0) {
    return ( 
      <>
        <Title text='statistics' />
        <p>No feedback given</p>
      </>
    ) 
  }


  return (
    <div>
      <Title text='statistics' />
      <table>
        <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={`${positive} %`} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({onclick, text}) => {
  return <button onClick={onclick} >
    {text}
  </button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1;
    const newTotal = updatedGood + neutral + bad
    const newPositive = 100 * updatedGood / newTotal;

    setGood(updatedGood)
    setTotal(newTotal)
    setAverage((updatedGood - bad) / newTotal)
    setPositive(newPositive)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    const newTotal = good + updatedNeutral + bad;
    const newPositive = 100 * good / newTotal;

    setNeutral(updatedNeutral)
    setTotal(newTotal)
    setAverage((good - bad)/newTotal)
    setPositive(newPositive)
  }

  const handleBad = () => {
    const updatedBad = bad + 1;
    const newTotal = good + neutral + updatedBad;
    const newPositive = 100 * good / newTotal;

    setBad(updatedBad)
    setTotal(newTotal)
    setAverage((good - updatedBad) / newTotal)
    setPositive(newPositive)
  }


  return (
    <div>
      <Title text='give feedback' />

      <Button onclick={handleGood} text='good' />
      <Button onclick={handleNeutral} text='neutral' />
      <Button onclick={handleBad} text='bad' />

      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
      

    </div>
  )
}

export default App