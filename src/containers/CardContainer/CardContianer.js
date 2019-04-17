import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../../components/Card/Card';
import PropTypes from 'prop-types';

export class CardContainer extends Component {
  render() {
    const { pokemon } = this.props;
    return (
      <section className='cards-container'>
        {pokemon.length > 0 &&
          pokemon.map(pokemon => {
            return <Card key={pokemon.name} pokemonInfo={pokemon} />
          })}
      </section>
    )
  }
}

export const mapStateToProps = (state) => ({
  pokemon: state.pokemon
});

export default connect(mapStateToProps)(CardContainer);

CardContainer.propTypes = {
  Pokemon: PropTypes.array
}