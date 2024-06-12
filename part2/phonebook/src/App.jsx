import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const duplicateNameFound = persons.find(({ name }) => name === newName)
    if (duplicateNameFound) {
      const changedPerson = { ...duplicateNameFound, number: newNumber}
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        personsService
          .update(duplicateNameFound.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            console.log(returnedPerson)
          })
        }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })    
    }
  }

  const removePerson = (id) => {  
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deletePerson(person.id)
        .then(setPersons(persons.filter(p => p.id !== id))
      )}
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} persons={persons} setSearch={setSearch} />
      <h2>add a new</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      {persons.map(person =>
        <Person 
          key={person.id}
          name={person.name}
          number={person.number}
          deletePerson={() => removePerson(person.id)}
        />
      )}
    </div>
  )
}

export default App