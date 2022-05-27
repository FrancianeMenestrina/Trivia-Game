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
    const numberThree = 3;
    const { scoreTotal, acertos, returnName, returnPicture } = this.props;
    return (
      <>
        <p>FeedBack</p>
        <header>
          <img
            src={ returnPicture }
            alt="Imagem-Token"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ returnName }</p>
          <p data-testid="header-score">{scoreTotal}</p>
          <p data-testid="feedback-total-score">{scoreTotal}</p>
          <p data-testid="feedback-total-question">{acertos}</p>
          { acertos >= numberThree && (<h3 data-testid="feedback-text">Well Done!</h3>)}
          { acertos < numberThree && (
            <h3 data-testid="feedback-text">Could be better...</h3>)}
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
  returnName: state.player.name,
  returnPicture: state.player.picture,
});

FeedBack.propTypes = {
  scoreTotal: PropTypes.string.isRequired,
  acertos: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  returnName: PropTypes.string.isRequired,
  returnPicture: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(FeedBack);
