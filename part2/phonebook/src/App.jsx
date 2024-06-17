import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState('')
  const [showMsg, setShowMsg] = useState(false)

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
            setNotification({
              status: "success",
              msg: `Updated ${changedPerson.name}'s number to ${newNumber}!`
            })
            setShowMsg(true)
          })
          .catch((err) => {
            setNotification({
              status: "error",
              msg: `Error: ${err}`
            })
            setShowMsg(true)
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
          setNotification({
            status: "error",
            msg: `Added ${newName} with number: ${newNumber}`,
          })
          setShowMsg(true)
        })
    }
  }

  function removePerson(personName) {
    if (window.confirm(`Deleting ${personName}!`)) {
      const personObj = persons.find(p => p.name === personName)
      personsService
        .deletePerson(personObj.id, personObj)
        .then((response) => {
          setPersons((prevState) => {
            setNotification({
              status: "success",
              msg: `Success: You deleted ${personObj.name} in the Phonebook!`,
            })
            setShowMsg(true)
            return prevState.filter(p => p.id !== personObj.id)
          })
        })
        .catch((err) => {
          setNotification({
            status: "error",
            msg: `Error: ${personObj.name} has already been removed from the server`,          
          })
          setShowMsg(true)
        })
      }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  useEffect(() => {
    personsService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  useEffect(() => {
		if (showMsg) {
			const toRef = setTimeout(() => {
				setShowMsg(false);
				clearTimeout(toRef);
			}, 3000);
		}
	}, [showMsg]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.msg} status={notification.status}/>
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
          deletePerson={removePerson}
        />
      )}
    </div>
  )
}

export default App