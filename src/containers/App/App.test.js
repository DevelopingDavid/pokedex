import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
let mockPokemon = [{
  height: 22, 
  id: 149, 
  name: "dragonite",
  sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png" },
  weight: 2100
}];

describe('App', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(
      <App grabPokemon={jest.fn()}/>
    )
    instance = wrapper.instance();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default state', () => {
    expect(wrapper.state()).toEqual({
      loading: true
    });
  });

  it('should call upon fetchGenOne on componentDidMount', () => {
    const spy = jest.spyOn(instance, 'fetchGenOne');

    instance.componentDidMount();

    expect(spy).toHaveBeenCalled();
  });

  it('should fetch pokemon upon invoking fetchGenOne', async () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    instance.fetchGenOne();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/generation/1/');
  });
  
  it('should call upon sortData invoking cleanData', () => {
    let spy = jest.spyOn(instance, 'sortData');

    instance.cleanData(mockPokemon);

    expect(spy).toHaveBeenCalled();
  });

  it('should setState upon invoking cleanData', () => {
    instance.cleanData(mockPokemon);
    expect(wrapper.state('loading')).toEqual(false)
  });
});