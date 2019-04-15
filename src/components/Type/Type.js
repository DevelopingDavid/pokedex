import React from 'react';

const Type = ({type}) => {
  return (
    <div>
      <h1 className={type}>{type}</h1>
    </div>
  )
};

export default Type;