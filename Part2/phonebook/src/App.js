import {useEffect, useState} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    type: 'info'
  })

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      // id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    const person = persons.find(person => person.name === newName)
    if (person) {
      // alert(`${newName} is already added to phonebook`)

      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return
      }

      personService.update(person.id, personObject)
        .then(response => {
          personService.getAll()
            .then(res => {
              setPersons(res)
            })

          setNotification({message: `Changed number of '${newName}'`, type: 'info'})
          setTimeout(() => {
            setNotification({message: null, type: 'info'})
          }, 5000)
        })
        .catch(_ => {
          setNotification({message: `Information of ${newName} has already been removed from server`, type: 'error'})
        })
    } else {
      personService.create(personObject)
        .then(response => {
          setPersons(persons.concat(response))

          setNotification({message: `Added '${newName}'`, type: 'info'})
          setTimeout(() => {
            setNotification({message: null, type: 'info'})
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id)
        .then(() => {
          personService.getAll()
            .then(response => {
              setPersons(response)
            })
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter filter={filterValue} setFilter={setFilterValue}/>

      <h3>add a new</h3>
      <PersonForm name={newName} setName={setNewName}
                  number={newNumber} setNumber={setNewNumber}
                  addPerson={addPerson}/>

      <h3>Numbers</h3>
      <Persons persons={persons} filterValue={filterValue}
               deletePerson={deletePerson}/>
    </div>
  )
}

export default App