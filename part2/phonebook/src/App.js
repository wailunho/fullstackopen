import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'
import PersonService from './services/persons'

const MESSAGE_TYPE_SUCCESS = 'success'
const MESSAGE_TYPE_ERROR = 'error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState(MESSAGE_TYPE_SUCCESS)

  const showSuccessMsg = (msg) => {
    setMessageType(MESSAGE_TYPE_SUCCESS)
    setMessage(msg)
    setTimeout(() => {setMessage('')}, 5000)
  }

  const showErrorMsg = (msg) => {
    setMessageType(MESSAGE_TYPE_ERROR)
    setMessage(msg)
    setTimeout(() => {setMessage('')}, 5000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.map(x => x.name).includes(newPerson.name)) {
      if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){
        const p = persons.find(x => x.name === newPerson.name)
        return PersonService.update(p.id, newPerson).then(data => {
          setPersons(persons.map(x => x.id === p.id? data: x))
        })
      } else {
        return
      }
    }
    PersonService.create({ name: newPerson.name, number: newPerson.number }).then(data => {
      setPersons(persons.concat(data))
      setNewPerson({ name: '', number: '' })
      showSuccessMsg(`Added ${data.name}`)
    })
  }

  const handleChangeName = (e) => {
    setNewPerson({ ...newPerson, name: e.target.value })
  }

  const handleChangeNumber = (e) => {
    setNewPerson({ ...newPerson, number: e.target.value })
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleDelete = (id, name) => {
    return () => {
      if (window.confirm(`Delete ${name}?`)) {
        PersonService.remove(id).then(() => {
          setPersons(persons.filter(x => x.id !== id))
        }).catch(e => {
          console.error(e)
          setPersons(persons.filter(x => x.id !== id))
          showErrorMsg(`Information of ${name} has already been removed from server`)
        })
      }
    }
  }

  const personsToShow = search ? persons.filter(x => x.name.match(new RegExp(search, 'i'))) : persons

  useEffect(() => {
    PersonService.getAll().then(data => {
      setPersons(data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
      <Filter handleSearch={handleSearch} search={search}/>
      <h3>Add a new</h3>
      <PersonForm handleSubmit={handleSubmit} handleChangeName={handleChangeName}
                  handleChangeNumber={handleChangeNumber} newPerson={newPerson}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App