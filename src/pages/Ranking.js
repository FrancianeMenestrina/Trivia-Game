import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  onClickInicio = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.map((player, index) => (
          <div key={ index }>
            <img
              src={ player.picture }
              alt="Imagem-Token"
            />
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
          </div>
        ))}
        <button
          type="button"
          onClick={ this.onClickInicio }
          data-testid="btn-go-home"
        >
          Início
        </button>
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
