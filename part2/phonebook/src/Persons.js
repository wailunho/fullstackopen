import Person from './Person'
import PersonService from './services/persons'

const Persons = ({ persons, handleDelete }) => {

  return (
    <div>
      {persons.map(x => <Person key={x.name} person={x} handleDelete={handleDelete}/>)}
    </div>
  )
}

export default Persons