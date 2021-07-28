import React, { useState, useEffect } from "react";
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import personService from './services/persons'

import './index.css'

const Notification = ({ message, check }) => {
  if(message === null){
    return null
  }

  return (
    <div className={check ? 'success' : 'error'}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPerson, setSearchPerson] = useState("");
  const [message, setMessage] = useState(null);
  const [check, setCheck] = useState(true)

  useEffect(() => {
    // console.log('effect')
    personService
      .getAll2()
      .then(initialPersons => {
        // console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  // console.log(persons);

  const addPerson = e => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }

    if(persons.some((person) => person.name === newName)){
        const p = persons.find(person => person.name === newName)
        const pChanged = {
          ...p,
          number: newNumber
        }

      if(window.confirm(`${newName} is already added to the phonebook, replace the old number, with a new one?`)){
        personService
          .update(p.id, pChanged)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== p.id ? person : returnedPerson))
            setCheck(true)
            setMessage(`${newName} number update`)
            setTimeout(() => {setMessage(null)}, 2000)
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            setCheck(false)
            setMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {setMessage(null)}, 2000)
          })
      }
    }else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${newName}`)
          setTimeout(() => {setMessage(null)}, 2000)
          setNewName('');
          setNewNumber('');
        })
    }
     
  };

  const handlePersonChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
 
  const handleFilterPersons = (e) => {
    setSearchPerson(e.target.value)
  }

  const handleDeleteClick = id => {
    const person = persons.find(p => p.id === id)
    const personParams = {
      ...person, id: person.id
    }

    if(window.confirm(`Delete ${person.name}?`)) {
      personService
        .deleteNote(id, personParams)
        .then(returnedPerson => {
          // console.log(person)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setCheck(false)
          setMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {setMessage(null)}, 2000)
        })
    }
  }

  let filteredPersons = persons.filter(
    person => 
      // console.log(person.name)
      person.name
        .toLocaleLowerCase()
        .indexOf(searchPerson.toLocaleLowerCase()) !== -1
    )

  return (
    <div>
      <h2>Phonebook</h2> 
      <Notification message={message} check={check}/>
      
      <Filter 
        value={searchPerson}
        handleEvent={handleFilterPersons}
      />

      <h3>add a new</h3>
      
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handlePersonChange={handlePersonChange}
      />

      <h3>Numbers</h3>

      <div>
        {filteredPersons.map((person) => (
          <Person
            key={person.id}
            person={person}
            event={() => handleDeleteClick(person.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

