import React, { Component } from 'react';
import { connect } from 'react-redux';
import { grabAllPokemon } from '../../actions';
import CardContainer from '../CardContainer/CardContianer';
import { Switch, Route } from 'react-router-dom';
import Popup from '../../components/Popup/Popup';
import logo from '../../images/logo.png';
import loader from '../../images/loader.gif';
import PropTypes from 'prop-types';

export class App extends Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }

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
    let sorted = this.sortData(cleaned);
    this.props.grabPokemon(sorted);
    this.setState({ loading: false })
  }

  sortData = (pokemon) => {
    return pokemon.sort((a, b) => {
      return a.dexNumber - b.dexNumber
    });
  }

  render() {
    return (
      <section className="App">
        <header>
          <img className='logo' src={logo} alt='logo' />
        </header>
        {this.state.loading &&
          <div className='loader-container'>
            <img src={loader} alt='loader' />
            <h1>loading...</h1>
          </div>
        }
        {
          !this.state.loading &&
          <div>
            <Switch>
              <Route path="/" exact component={CardContainer} />
              <Route path="/pokemon/:id" render={({ match }) => {
                const { id } = match.params;
                const currentPokemon = this.props.pokemon.find(pokemon => pokemon.dexNumber === parseInt(id));
                return <Popup id={currentPokemon.dexNumber} currentPokemon={currentPokemon} />
              }} />
            </Switch>
          </div>
        }
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

App.propTypes = {
  pokemon: PropTypes.array,
  grabPokemon: PropTypes.func
}