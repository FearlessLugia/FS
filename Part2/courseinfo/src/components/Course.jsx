import React from 'react'

const Header = ({name}) => <h2>{name}</h2>

const Content = ({parts}) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0)

  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part}/>)}
      <Total sum={total}/>
    </div>
  )
}

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Total = ({sum}) => <h4>Number of exercises {sum}</h4>

const Course = ({course}) => (
  <div>
    <Header name={course.name}/>
    <Content parts={course.parts}/>
  </div>
)


export default Course