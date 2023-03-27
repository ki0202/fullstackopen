const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.numExercices}</p>
    </div>
  )
}

const Content = (props) => {
  // console.log(props)
  return (
    <div>
      {/* for (let i=0; i < props.parts.length; i++) {
        <Part part={props.parts[i]} numExercices={props.numExercices[i]}/>
      } */}
      <Part part={props.parts[0].name} numExercices={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} numExercices={props.parts[0].exercises}/>
      <Part part={props.parts[2].name} numExercices={props.parts[0].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises  {props.parts.map(x => x.exercises).reduce((partialSum, a) => partialSum + a, 0)}</p>
    </div>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App