const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(x => <Part key={x.id} part={x}/>)}
  </>

const Course = ({ course }) => {
  const sum = course.parts.map(x => x.exercises)
    .reduce((total, num) => total + num, 0)
  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total sum={sum}/>
    </>
  )
}

export default Course