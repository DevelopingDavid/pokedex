import React from 'react';

const Type = ({type}) => {
  return (
    <div className='type-container'>
      <h1 className={type}>{type}</h1>
    </div>
  )
};

export default Type;