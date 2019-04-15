import React from 'react';

const Card = ({ pokemonInfo }) => {
  const types = pokemonInfo.types.map(t => {
    const type = t.type.name;
    return type;
  });
  return (
    <article>
      <h1>{pokemonInfo.name}</h1>
      <img src={pokemonInfo.sprite} alt={pokemonInfo.name} />
      <h1>weight: {pokemonInfo.weight}</h1>
      <h1>height: {pokemonInfo.height}</h1>
      {
        types.map(type => {
          return <h1>{type}</h1>
        })
      }
    </article>
  )
}

export default Card;