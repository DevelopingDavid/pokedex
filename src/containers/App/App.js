import React, { Component } from 'react';
import { connect } from 'react-redux';
import { grabAllPokemon } from '../../actions';
import CardContainer from '../CardContainer/CardContianer';
import { Switch, Route } from 'react-router-dom';
import Popup from '../../components/Popup/Popup';

export class App extends Component {
  componentDidMount() {
    this.fetchGenOne();
  }

  fetchGenOne = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/generation/1/`);
    const data = await response.json();
    const resolved = await this.fetchInfo(data.pokemon_species);
    this.cleanData(resolved);
  }
  
  fetchInfo = async (pokemon) => {
    let pokemonInfo = pokemon.map(async pokemon => {
      const id = pokemon.url.substring(42);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      return data;
    });
    return Promise.all(pokemonInfo)
  }
  
  cleanData = (pokemon) => {
    let cleaned = pokemon.map(pokemon => ({
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types,
      dexNumber: pokemon.id
    }));
    const sorted = cleaned.sort((a, b) => {
     return a.dexNumber - b.dexNumber
    });
    this.props.grabPokemon(sorted);
  }

  render() {
    return (
      <section className="App">
        <header>
          <h1>Gen 1 Pokédex</h1>
        </header>
        <Switch>
          <Route path="/" exact component={CardContainer} />
          <Route path="/pokemon/:name" render={({ match }) => {
            const { name } = match.params;
            const currentPokemon = this.props.pokemon.find(pokemon => pokemon.name === name);
            return <Popup {...currentPokemon} />
          }} />
        </Switch>
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  pokemon: state.pokemon
});

export const mapDispatchToProps = (dispatch) => ({
  grabPokemon: (pokemon) => dispatch(grabAllPokemon(pokemon))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
