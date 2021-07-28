import React from "react";

const PersonForm = ({addPerson, newName, newNumber, handleNumberChange, handlePersonChange}) => (

  <form onSubmit={addPerson}>
    <div>
      name:
      <input 
        value={newName}
        onChange={handlePersonChange}
        required
      />
    </div>
    <div>
      number:
      <input 
        value={newNumber}
        onChange={handleNumberChange}
        required
     />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  
);

export default PersonForm;