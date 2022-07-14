import React from "react";
import { render } from "react-dom";

const Persons = ({persons, filterName, deletePerson}) => 

{
    return (
        <div> 
        {persons
        .filter(p=> p.name.toLowerCase().includes(filterName))
        .map(p => <ul key={p.id}>{p.name} {p.number} <button onClick={() => deletePerson(p.id)}>delete</button></ul>)}
        </div>
    )
}


export default Persons