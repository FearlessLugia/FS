const Persons = ({persons, filterValue, deletePerson}) => (
  persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
    .map(person => (
      <p key={person.name}>
        {person.name} {person.number}
        <button onClick={() => deletePerson(person)}>delete</button>
      </p>)
    )
)

export default Persons