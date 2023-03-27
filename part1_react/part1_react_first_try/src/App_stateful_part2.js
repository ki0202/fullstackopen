import { useState } from 'react'

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    // To avoid async behavior
    const updatedLeft = clicks.left + 1
    setClicks({
      ...clicks,
      left: updatedLeft
    })
    setTotal(updatedLeft + clicks.right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setClicks({
      ...clicks,
      right: clicks.right + 1
    })
    setTotal(clicks.left + clicks.right)
  }

  return (
    <div>
      {clicks.left}
      <Button handleClick={handleLeftClick} text='left'/>
      <Button handleClick={handleRightClick} text='right'/>
      {clicks.right}
      <History allClicks={allClicks} />
    </div>
  )
}

export default App