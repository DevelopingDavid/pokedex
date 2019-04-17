import React from 'react';
import Type from '../Type/Type';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Card = ({ pokemonInfo }) => {
  const types = pokemonInfo.types.map(t => {
    const type = t.type.name;
    return type;
  });

  return (
    <article className='card'>
      <Link to={`/pokemon/${pokemonInfo.dexNumber}`}>
        <img src={pokemonInfo.sprite} alt={pokemonInfo.name} />
        <h1>{pokemonInfo.name}</h1>
        <div className='types-container'>
          {
            types.map(type => {
              return <Type key={type} type={type} />
            })
          }
        </div>
      </Link>
    </article>
  )
}

Card.propTypes = {
  pokemonInfo: PropTypes.object
}

export default Card;