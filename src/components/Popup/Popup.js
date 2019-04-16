import React, { Component } from 'react';

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extraDetails: {},
      loading: true
    }
  }

  async componentDidMount() {
    let data = await this.grabDetails(this.props.id);
    this.setState({ extraDetails: data, loading: false });
  }

  grabDetails = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const data = await response.json();
    return data;
  }

  render() {
    const { currentPokemon } = this.props;
    const { extraDetails } = this.state;
    let englishText;
    if(Object.keys(extraDetails).length > 0) {
      englishText = extraDetails.flavor_text_entries.find(lang => {
       return lang.language.name === 'en'
      });
    }

    return (
      <article>
        { !this.state.loading &&
          <div>
            <h1>{currentPokemon.name}</h1>
            <img src={currentPokemon.sprite} />
            <h1>weight: {currentPokemon.weight} hectograms</h1>
            <h1>height: {currentPokemon.height} decimetres</h1>
            <h1>kind: {extraDetails.shape.name}</h1>
            <h1>habitat: {extraDetails.habitat.name}</h1>
            <h1>{englishText.flavor_text}</h1>
          </div>
        }
      </article>
    )
  }
};