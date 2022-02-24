const Person = ({ person, handleDelete }) => {
  return (
    <div><span>{person.name} {person.number}</span><button onClick={handleDelete(person.id, person.name)}>delete</button><br></br></div>
  )
}

export default Person