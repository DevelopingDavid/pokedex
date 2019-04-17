import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import loader from '../../images/loader.gif';
import PropTypes from 'prop-types';
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
    let convertedfeet;
    let convertedPounds;
    if (Object.keys(extraDetails).length > 0) {
      let convertedInch = Math.floor(currentPokemon.height * 3.93701);
      let feetFromInch = Math.floor(convertedInch / 12);
      let inchesRemainder = convertedInch % 12;
      convertedfeet = `${feetFromInch}'${inchesRemainder}"`
      convertedPounds = Math.floor(currentPokemon.weight * 0.220462);
      englishText = extraDetails.flavor_text_entries.find(lang => {
        return lang.language.name === 'en'
      });
    }

    return (
      <article className='popup-container'>
        {this.state.loading &&
          <div className='loader-container'>
            <img src={loader} alt='loader' />
            <h1>loading...</h1>
          </div>
        }
        {!this.state.loading &&
          <div className='popup-card'>
            <div className='popup-pokemon'>
              <div>
                <h1>#{currentPokemon.dexNumber}</h1>
                <h1>{currentPokemon.name}</h1>
              </div>
              <img className='sprite-image' src={currentPokemon.sprite} alt={currentPokemon.name} />
            </div>
            <div className='popup-info'>
              <h1>{englishText.flavor_text}</h1>
              <h1>weight: {convertedPounds} lbs</h1>
              <h1>height: {convertedfeet} ft</h1>
              <h1>kind: {extraDetails.shape.name}</h1>
              <h1>habitat: {extraDetails.habitat.name}</h1>
              <Link to='/'>return</Link>
            </div>
          </div>
        }
      </article>
    )
  }
};

Popup.propTypes = {
  currentPokemon: PropTypes.object,
  extraDetails: PropTypes.object
}