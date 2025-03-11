import React, {useState} from 'react'

const Display = ({title}) => <h2>{title}</h2>

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all === 0) {
    return <div>No feedback given</div>
  }

  const average = (good - bad) / all
  const positive = 100 * (good + neutral) / all + ' %'
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={all}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={positive}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setValue = (name) => {
    switch (name) {
      case 'good':
        setGood(good + 1)
        break
      case 'neutral':
        setNeutral(neutral + 1)
        break
      case 'bad':
        setBad(bad + 1)
        break
    }
  }

  return (
    <div>
      <Display title='give feedback'/>
      <Button handleClick={() => setValue('good')} text='good'/>
      <Button handleClick={() => setValue('neutral')} text='neutral'/>
      <Button handleClick={() => setValue('bad')} text='bad'/>

      <Display title='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App