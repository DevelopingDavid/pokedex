import { grabAllPokemonReducer } from './grabAllPokemonReducer';
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  pokemon: grabAllPokemonReducer
});