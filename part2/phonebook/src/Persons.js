import Person from './Person'

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(x => <Person key={x.name} person={x}/>)}
    </div>
  )
}

export default Persons