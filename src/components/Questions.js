import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import he from 'he';

class Questions extends Component {
  render() {
    const { questions, onClickNext, handleOnClick,
      css, disable, btnNext, countDown, over, respostas } = this.props;
    return (
      <div>
        {!questions ? null : (
          <div>
            <p>{ over ? 'Game Over' : countDown }</p>
            <p data-testid="question-category">{questions.category}</p>
            <p data-testid="question-text">{he.decode(questions.question)}</p>
            <div data-testid="answer-options">
              {
                respostas.map(
                  (resposta, index) => (questions.correct_answer === resposta
                    ? (
                      <button
                        type="button"
                        key={ index }
                        disabled={ disable }
                        data-testid="correct-answer"
                        value={ resposta }
                        onClick={ handleOnClick }
                        style={
                          css
                            ? { border: '3px solid rgb(6, 240, 15)' }
                            : { color: 'black' }
                        }
                      >
                        {he.decode(resposta)}
                      </button>
                    ) : (
                      <button
                        type="button"
                        key={ index }
                        disabled={ disable }
                        data-testid={ `wrong-answer-${index}` }
                        value={ resposta }
                        onClick={ handleOnClick }
                        style={
                          css ? { border: '3px solid red' } : { color: 'black' }
                        }
                      >
                        {he.decode(resposta)}
                      </button>
                    )),
                )
              }
            </div>
            { btnNext && (
              <button
                data-testid="btn-next"
                type="submit"
                onClick={ onClickNext }
              >
                Next
              </button>)}
          </div>
        )}
      </div>
    );
  }
}

/* const mapStateToProps = (state) => ({
  scoreTotal: state.playerReducer.player.score,
}); */

Questions.propTypes = {
  questions: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  respostas: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickNext: PropTypes.func.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  css: PropTypes.bool.isRequired,
  disable: PropTypes.bool.isRequired,
  btnNext: PropTypes.bool.isRequired,
  countDown: PropTypes.number.isRequired,
  over: PropTypes.bool.isRequired,
};

export default Questions;
