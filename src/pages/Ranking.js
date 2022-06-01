import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import './Ranking.css';

class Ranking extends Component {
  onClickInicio = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    return (
      <div className="App-gamer">
        <img src={ logo } className="App-logo-game" alt="logo" />
        <div>
          <h1 data-testid="ranking-title" className="ranking">- Ranking -</h1>
          {ranking.map((player, index) => (
            <div key={ index } className="div-mae">
              <div key={ index } className="div-ranking">
                <img
                  src={ player.picture }
                  alt="Imagem-Token"
                  className="image-gravatar"
                />
                <p data-testid={ `player-name-${index}` }>{`Player: ${player.name}`}</p>
                <p data-testid={ `player-score-${index}` }>{`Score: ${player.score}`}</p>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={ this.onClickInicio }
            className="btn-inicio"
            data-testid="btn-go-home"
          >
            Home
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
