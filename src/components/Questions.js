import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Questions extends Component {
  // constructor() {
  //   super();

  //   this.state = {

  //   };
  // }

  render() {
    const { questions, onClickNext, handleOnClick,
      css, disable, btnNext, countDown, over, respostas } = this.props;
      // console.log(questions);
    return (
      <div>
        {!questions ? null : (
          <div>
            <p>{ over ? 'Game Over' : countDown }</p>
            <p data-testid="question-category">{questions.category}</p>
            <p data-testid="question-text">{questions.question}</p>
            <div data-testid="answer-options">
              {
                respostas.map(
                  (resposta, index) => (questions.correct_answer === resposta ? (
                    <button
                      type="button"
                      key={ index }
                      disabled={ disable }
                      data-testid="correct-answer"
                      onClick={ handleOnClick }
                      style={
                        css
                          ? { border: '3px solid rgb(6, 240, 15)' }
                          : { color: 'black' }
                      }
                    >
                      {resposta}
                    </button>
                  ) : (
                    <button
                      type="button"
                      key={ index }
                      disabled={ disable }
                      data-testid={ `wrong-answer-${index}` }
                      onClick={ handleOnClick }
                      style={
                        css ? { border: '3px solid red' } : { color: 'black' }
                      }
                    >
                      {resposta}
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

// const mapStateToProps = (state) => ({
//   questionsTest: state.playerReducer.questions,
// });

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
