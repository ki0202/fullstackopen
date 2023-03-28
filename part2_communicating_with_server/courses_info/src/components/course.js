const Header = ({ name }) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
  const Part = ({ part, numExercices}) => {
    return (
      <div>
        <p>{part} {numExercices}</p>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part.name} numExercices={part.exercises}/>)}
        <Total parts={parts}/>
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    return (
      <div>
        <strong>Total of {parts.map(x => x.exercises).reduce((partialSum, a) => partialSum + a, 0)} exercises</strong>
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
      </div>
    )
  }

  export default Course