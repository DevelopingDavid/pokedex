import React from 'react';
import { shallow } from 'enzyme';
import Popup from './Popup';
let mockpokemon = {
  dexNumber: 1,
  height: 7,
  name: "bulbasaur",
  sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  types: (2)[{}, {}],
  weight: 69
}
describe('Popup', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Popup id={1} currentPokemon={mockpokemon}/>
    )
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call upon grabDetails on component`DidMount', () => {
    let instance = wrapper.instance();
    let spy = jest.spyOn(instance, 'grabDetails');
    instance.componentDidMount();
    expect(spy).toHaveBeenCalled();
  });

  it('should setState on componentDidMount', async () => {
    let instance = wrapper.instance();
    await instance.componentDidMount();
    expect(wrapper.state('loading')).toEqual(false)
  });
});