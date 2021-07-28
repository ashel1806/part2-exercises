import React from "react";

const Persons = ({person, event}) => (
  <>
    <p>{person.name} {person.number}</p>
    <button onClick={event}>delete</button>
  </>
);

export default Persons;