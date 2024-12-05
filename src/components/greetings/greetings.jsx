import React from 'react';
import '../greetings/greetings.css';

function Greetings({ message }) {
  return (
    <div className="container">
      <h1>{message}</h1>
    </div>
  );
}

export default Greetings;
