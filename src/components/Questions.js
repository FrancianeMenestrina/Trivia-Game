import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Questions extends Component {
  ordemAleatoria = () => {
    const { questions } = this.props;
    if (!questions) {
      return null;
    }
    const arrayAnswers = [questions.correct_answer, ...questions.incorrect_answers];
    const ZERO_CINCO = 0.5;
    arrayAnswers.sort(() => Math.random() - ZERO_CINCO);
    console.log(arrayAnswers);
    return arrayAnswers;
  }

  render() {
    const { questions } = this.props;
    const ordemAleatoria = this.ordemAleatoria();
    // console.log(questions);
    return (
      <div>
        { !questions ? null : (
          <div>
            <p data-testid="question-category">{questions.category}</p>
            <p data-testid="question-text">{questions.question}</p>
            <div data-testid="answer-options">
              {
                ordemAleatoria.map((resposta, index) => (
                  questions.correct_answer === resposta ? (
                    <button
                      type="button"
                      key={ index }
                      data-testid="correct-answer"
                    >
                      {resposta}

                    </button>
                  ) : (
                    <button
                      type="button"
                      key={ index }
                      data-testid={ `wrong-answer-${index}` }
                    >
                      {resposta}
                    </button>
                  )))
              }
            </div>
          </div>
        ) }
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   questions: state.playerReducer.questions,
// });

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(),
  })).isRequired,
};

export default Questions;
