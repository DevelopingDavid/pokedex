import React from 'react';
import Type from '../Type/Type';
import { Link } from 'react-router-dom';

const Card = ({ pokemonInfo }) => {
  const types = pokemonInfo.types.map(t => {
    const type = t.type.name;
    return type;
  });

  return (
    <article className='card'>
      <h1>{pokemonInfo.name}</h1>
      <Link to={`/pokemon/${pokemonInfo.dexNumber}`}>
        <img src={pokemonInfo.sprite} alt={pokemonInfo.name} />
      </Link>
      <div className='types-container'>
        {
          types.map(type => {
            return <Type key={type} type={type} />
          })
        }
      </div>
    </article>
  )
}

export default Card;