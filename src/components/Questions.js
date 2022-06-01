import React, { Component } from 'react';
import PropTypes from 'prop-types';
import he from 'he';
import './Question.css';

class Questions extends Component {
  render() {
    const { questions, onClickNext, handleOnClick,
      css, disable, btnNext, countDown, over, respostas } = this.props;
    return (
      <div className="div-container">
        {!questions ? null : (
          <div>
            <div className="div-time">
              <p>{ over ? <p className="p-gameOver">GAME OVER</p> : `0:${countDown}` }</p>
            </div>
            <div className="card-game">
              <div className="div-category div-font">
                <p data-testid="question-category">{questions.category}</p>
              </div>
              <div className="div-questions div-font">
                <p data-testid="question-text">{he.decode(questions.question)}</p>
              </div>
              <div data-testid="answer-options" className="div-answers div-font">
                {
                  respostas.map(
                    (resposta, index) => (questions.correct_answer === resposta
                      ? (
                        <button
                          type="button"
                          className="btn-answer"
                          key={ index }
                          disabled={ disable }
                          data-testid="correct-answer"
                          value={ resposta }
                          onClick={ handleOnClick }
                          style={
                            css
                              ? { border: '3px solid rgb(6, 240, 15)', color: 'black', backgroundColor: 'rgb(6, 240, 15)' }
                              : { color: 'black' }
                          }
                        >
                          {he.decode(resposta)}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-answer"
                          key={ index }
                          disabled={ disable }
                          data-testid={ `wrong-answer-${index}` }
                          value={ resposta }
                          onClick={ handleOnClick }
                          style={
                            css ? { border: '3px solid red', color: 'black' } : { color: 'black' }
                          }
                        >
                          {he.decode(resposta)}
                        </button>
                      )),
                  )
                }
              </div>
              <div className="div-next div-font">
                { btnNext && (
                  <button
                    data-testid="btn-next"
                    type="submit"
                    className="btn-next"
                    onClick={ onClickNext }
                  >
                    Next
                  </button>)}
              </div>
            </div>
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
