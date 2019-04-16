import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';

let mockPokemon = {
  name: 'charmander',
  types: [{ slot: 2, type: { name: 'fire' } }]
}

describe('Card', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Card key={mockPokemon.name} pokemonInfo={mockPokemon} />
    )
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});