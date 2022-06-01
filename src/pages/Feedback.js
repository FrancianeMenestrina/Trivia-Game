import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import './Feedback.css';

class Feedback extends Component {
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
      <div className="App-gamer">
        <header className="header-game">
          <img
            src={ returnPicture }
            alt="Imagem-Token"
            data-testid="header-profile-picture"
            className="image-gravatar"
          />
          <p data-testid="header-player-name">{ `Player: ${returnName}` }</p>
          <p
            data-testid="header-score"
            className="font-geral"
          >
            {`Score: ${scoreTotal}`}
          </p>
        </header>
        <img src={ logo } className="App-logo-game" alt="logo" />
        <div className="div-feedback">
          <p className="feedback">- Feedback -</p>
        </div>
        <div className="card-feedback">
          <p
            data-testid="feedback-total-score"
            className="font-geral"
          >
            {`Total Score: ${scoreTotal}`}
          </p>
          <p
            data-testid="feedback-total-question"
            className="font-geral"
          >
            {`Total Assertions: ${acertos}`}
          </p>
          { acertos >= numberThree && (
            <div>
              <span
                role="img"
                aria-label="Feliz"
                style={ { fontSize: '100px' } }
              >
                &#128526;
              </span>
              <h3 data-testid="feedback-text" className="font-geral">Well Done!</h3>
            </div>)}
          { acertos < numberThree && (
            <div>
              <span
                role="img"
                aria-label="Triste"
                style={ { fontSize: '100px' } }
              >
                &#128531;
              </span>
              <h3
                data-testid="feedback-text"
                className="font-geral"
              >
                Could be better...
              </h3>
            </div>)}
          <button
            type="button"
            onClick={ this.onClickPlayAgain }
            data-testid="btn-play-again"
            className="btn-play-feedback"
          >
            Play Again
          </button>
          <button
            type="button"
            className="btn-ranking"
            onClick={ this.onClickRanking }
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  scoreTotal: state.player.score,
  acertos: state.player.assertions,
  returnName: state.player.name,
  returnPicture: state.player.picture,
});

Feedback.propTypes = {
  scoreTotal: PropTypes.string.isRequired,
  acertos: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  returnName: PropTypes.string.isRequired,
  returnPicture: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
