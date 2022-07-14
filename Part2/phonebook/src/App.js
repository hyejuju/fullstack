import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationStatus, setNotificationMessageStatus] = useState('')

  useEffect(()=> {
    personService
    .getAll()
    .then(personsAtStart => {
      setPersons(personsAtStart)
    })
  }, [])

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number : newNumber
    }

    var peopleNames = persons.map(p => p.name);
   
     if (!peopleNames.includes(newName)) {
   /*   if(newName.length < 3){
        setNotificationMessageStatus("fail")
        setNotificationMessage(`'${newName}' has to be `)
        setTimeout(() => {
          setNotificationMessage(null)},5000)
      }
      } */
    
      personService
      .create(personObject)
      .then(newPerson => {
      setPersons(persons.concat(newPerson))
      setNotificationMessageStatus("success")
      setNotificationMessage(`'${newName}' was added`)
      setTimeout(() => {
        setNotificationMessage(null)},5000)
    })
    .catch(error => {
      setNotificationMessage(error.response.data)
      setTimeout(() => {
        setNotificationMessage(null)},5000)
    })
      setNewName('');
      setNewNumber('');
    }
    else{//UPDATE
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const thatId = persons.find(p => p.name === newName).id;
       
        personService
        .update(thatId, personObject)
        .then(updated => setPersons(persons.map(p => p.id !==thatId ? p : updated))
          
          ).catch(error => {
            console.log(error.response.data)
            setNotificationMessageStatus("fail")
          })
      }
    }
  }

  const deletePerson = (id) => {
   const thatPerson = persons.find(p=> p.id === id);
    if (window.confirm("Delete " +thatPerson.name + "?")) {
      personService
      .remove(id)
      .then((response) => {
        personService
          .getAll()
          .then(pps => {
            setPersons(pps);
            console.log(persons)
          })
      })
      .catch(error =>{
        setNotificationMessageStatus("fail")
        setNotificationMessage("Information of " + thatPerson.name + " has already been removed from server")
        setTimeout(() => {
          setNotificationMessage(null)},5000)
      }

      )
    }
  }

  const Notification = ({message, status}) => {
    /* if(notificationColor=="green"){
      .notification = {
        color: green;
      }
    } */
    if(message === null || message ===""){
      return null
    }
    if(notificationStatus==="fail"){
      return <div className='fail-notification'>
      {message}
    </div>
    }
    return (
      <div className='success-notification'>
      {message}
    </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} status={notificationStatus}/>
        <Filter filterName={filterName} setFilterName={setFilterName}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} deletePerson={deletePerson}/>

    </div>
  )
}

export default App