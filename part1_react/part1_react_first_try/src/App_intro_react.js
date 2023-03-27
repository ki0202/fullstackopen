const Hello = (props) => {
  console.log(props)
  const dateStr = props.date ? `, it's ${props.date}` : ""
  return (
    <div>
      <p>Hello {props.name}{dateStr}!</p>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const name = 'Alice'
  const friends = [
    {name: 'Bob', age: 21},
    {name: 'Bib', age: 22},
  ]
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={name} date={now.toISOString().split('T')[0]}/>
      <Hello name='Bob'/>
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
    </div>
  )
}

export default App