const PersonForm = ({ handleSubmit, handleChangeName, handleChangeNumber, newPerson }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>name: <input onChange={handleChangeName} value={newPerson.name}/></div>
        <div>number: <input onChange={handleChangeNumber} value={newPerson.number}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </div>
    </form>
  )
}

export default PersonForm