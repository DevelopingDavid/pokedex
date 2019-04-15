export const grabAllPokemonReducer = (state = [], action ) => {
  switch (action.type) {
    case 'GRAB_ALL_POKEMON':
      return action.pokemon;
    default:
      return state;
  }
};