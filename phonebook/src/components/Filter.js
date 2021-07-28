import React from "react";

const Filter = ({ value, handleEvent }) => 
    <div>
      filter shown with{" "}
      <input 
        value={value}
        onChange={handleEvent}
        required
      />
    </div>

export default Filter;
