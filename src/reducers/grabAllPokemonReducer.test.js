import { grabAllPokemonReducer } from './grabAllPokemonReducer';

describe('grabAllPokemonReducer', () => {
  it('should return initial state', () => {
    const expected = [];

    const result = grabAllPokemonReducer(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return state with new pokemons', () => {
    const expected = [{ name: 'charmander' }];
    const action = {
      type: 'GRAB_ALL_POKEMON',
      pokemon: [{ name: 'charmander' }]
    };

    const result = grabAllPokemonReducer(undefined, action);

    expect(result).toEqual(expected);
  });
});