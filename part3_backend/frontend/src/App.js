import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ value, onChange }) => {
  return (
    <form>
      <div>
        search by name
        <input value={value} onChange={onChange} />
      </div>
    </form>
  )
}

const PersonForm = ({ onSubmit, nameValue, nameOnChange, numberValue, numberOnChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input
          value={nameValue}
          onChange={nameOnChange}
        />
      </div>
      <div>
        number:
        <input value={numberValue} onChange={numberOnChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Number = ({ text, number, deletePerson }) => {
  return (
    <div>
      {text} {number}
      <button onClick={deletePerson}>delete</button>
    </div>
  )
}

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map(person => <Number key={person.id} text={person.name} number={person.number} deletePerson={() => deletePerson(person.id)} />)}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState(null)
  const [personsToShow, setPersonsToShow] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchQuery, setNewSearchQuery] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setPersonsToShow(initialPersons)
      })
  }, [])

  if (!persons) { 
    return null 
  }

  const addName = event => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    const exactPerson = persons.filter(person => person.name === newName)
    if (exactPerson.length === 0) {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setPersonsToShow(persons.concat(returnedPerson))
          setSuccessMessage(`${returnedPerson.name} added`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = exactPerson[0].id
        personService
          .update(id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
            setPersonsToShow(personsToShow.map(p => p.id !== id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`${returnedPerson.name} updated`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value
    setNewSearchQuery(searchQuery)
    setPersonsToShow(persons.filter(person =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  }

  const deletePerson = id => {
    const deleteFlag = window.confirm(`Delete ${persons.filter(p => p.id === id)[0].name}`)
    if (deleteFlag) {
      personService
        .drop(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setPersonsToShow(personsToShow.filter(p => p.id !== id))
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Filter value={newSearchQuery} onChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addName} nameValue={newName} nameOnChange={handleNameChange} numberValue={newNumber} numberOnChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App