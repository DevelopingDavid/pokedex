import React from 'react';
import { shallow } from 'enzyme';
import { CardContainer } from './CardContianer';

const mockPokemon = [{
  name: 'charmander',
  types: [{ slot: 2, type: { name: 'fire' } }]
}];

describe('CardContainer', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <CardContainer pokemon={mockPokemon}/>
    )
  });

  it('should match Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});