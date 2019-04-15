import React from 'react';
import Type from '../Type/Type';


const Card = ({ pokemonInfo }) => {
  const types = pokemonInfo.types.map(t => {
    const type = t.type.name;
    return type;
  });
  return (
    <article className='card'>
      <h1>{pokemonInfo.name}</h1>
      <img src={pokemonInfo.sprite} alt={pokemonInfo.name} />
      <h1>weight: {pokemonInfo.weight} hectograms</h1>
      <h1>height: {pokemonInfo.height} decimetres</h1>
      <div className='types-container'>
        {
          types.map(type => {
            return <Type key={type} type={type}/>
          })
        }
      </div>
    </article>
  )
}

export default Card;