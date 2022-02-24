import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [search, setSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.map(x => x.name).includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({ name: newPerson.name, number: newPerson.number }))
    setNewPerson({ name: '', number: '' })
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

  const personsToShow = search ? persons.filter(x => x.name.match(new RegExp(search, 'i'))) : persons

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(({ data }) => {
      setPersons(data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} search={search}/>
      <h3>Add a new</h3>
      <PersonForm handleSubmit={handleSubmit} handleChangeName={handleChangeName}
                  handleChangeNumber={handleChangeNumber} newPerson={newPerson}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App