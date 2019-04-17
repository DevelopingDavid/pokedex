import React from 'react';
import PropTypes from 'prop-types';
const Type = ({type}) => {
  return (
    <div className='type-container'>
      <h1 className={type}>{type}</h1>
    </div>
  )
};

export default Type;

Type.propTypes = {
  type: PropTypes.string
}