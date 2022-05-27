import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedBack extends Component {
  onClickPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  onClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const data = JSON.parse(localStorage.getItem('ranking'));
    const numberThree = 3;
    const { scoreTotal, acertos } = this.props;
    return (
      <>
        <p>FeedBack</p>
        <header>
          <img
            src={ data[0].picture }
            alt="Imagem-Token"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{data[0].name}</p>
          <p data-testid="header-score">{scoreTotal}</p>
          <p data-testid="feedback-total-score">{scoreTotal}</p>
          <p data-testid="feedback-total-question">{acertos}</p>
          { acertos >= numberThree && (<p data-testid="feedback-text">Well Done!</p>)}
          { acertos < numberThree && (
            <p data-testid="feedback-text">Could be better...</p>)}
          <button
            type="button"
            onClick={ this.onClickPlayAgain }
            data-testid="btn-play-again"
          >
            Play Again
          </button>
          <button
            type="button"
            onClick={ this.onClickRanking }
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </header>

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  scoreTotal: state.player.score,
  acertos: state.player.assertions,
});

FeedBack.propTypes = {
  scoreTotal: PropTypes.string.isRequired,
  acertos: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(FeedBack);
