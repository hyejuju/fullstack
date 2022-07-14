import React from "react";



const PersonForm = ({addPerson, newName, newNumber, setNewName, setNewNumber}) => {
    return (
        <form onSubmit={addPerson}>
        name: <input value={newName} onChange={e => setNewName(e.target.value)}/>
        <br />
        number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)}/>
        <br />
        <button type="submit">add</button>
    </form>
    )

}

export default PersonForm