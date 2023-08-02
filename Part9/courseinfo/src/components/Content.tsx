import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({part}: { part: CoursePart }) => {
  // let descFlag = false;

  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h4>{part.name} {part.exerciseCount}</h4>
          <i>{part.description}</i>
        </div>
      );
    case 'group':
      return (
        <div>
          <h4>{part.name} {part.exerciseCount}</h4>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <h4>{part.name} {part.exerciseCount}</h4>
          <i>{part.description}</i>
          <p>submit to {part.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h4>{part.name} {part.exerciseCount}</h4>
          <i>{part.description}</i>
          <p>required skills: {part.requirements.join(', ')}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Content = ({parts}: { parts: CoursePart[] }) => (
  <div>
    {parts.map(part => (
      <Part key={part.name} part={part}/>
    ))}
  </div>
);

export default Content;