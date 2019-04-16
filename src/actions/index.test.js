import * as actions from './index';

describe('actions', () => {
  it('should have a type of GRAB_ALL_POKEMON', () => {
    let mockPokemon = [{name: 'Charmander'},{name: 'weedle'}];
    const expectedAction = {
      type: 'GRAB_ALL_POKEMON',
      pokemon: mockPokemon
    };

    const result = actions.grabAllPokemon(mockPokemon);

    expect(result).toEqual(expectedAction);
  })
})