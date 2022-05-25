import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      css: false,
      respostas: [],
      countDown: 30,
      disable: false,
      over: false,
    };
  }

  componentDidMount = () => {
    const TIMER = 10;
    setTimeout(() => {
      const ordemAleatoria = this.ordemAleatoria();
      this.setState({ respostas: ordemAleatoria });
    }, TIMER);
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ countDown: prevState.countDown - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const TIME_LIMIT = 0;
    const { countDown } = this.state;
    if (countDown === TIME_LIMIT) {
      this.setState({ disable: true, countDown: 30, over: true });
      clearInterval(this.intervalId);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  ordemAleatoria = () => {
    const { questions } = this.props;
    if (!questions) {
      return null;
    }
    const arrayAnswers = [questions.correct_answer, ...questions.incorrect_answers];
    const ZERO_CINCO = 0.5;
    arrayAnswers.sort(() => Math.random() - ZERO_CINCO);
    if (arrayAnswers === [questions.correct_answer, ...questions.incorrect_answers]) {
      arrayAnswers.sort(() => Math.random() - ZERO_CINCO);
      return arrayAnswers;
    }
    return arrayAnswers;
  }

  handleOnClick = () => {
    this.setState({ css: true });
  }

  render() {
    const { questions } = this.props;
    const { css, respostas, disable, countDown, over } = this.state;
    // console.log(questions);
    return (
      <div>
        {!questions ? null : (
          <div>
            <p>{ over ? 'Game Over' : countDown }</p>
            <p data-testid="question-category">{questions.category}</p>
            <p data-testid="question-text">{questions.question}</p>
            <div data-testid="answer-options">
              {respostas.map(
                (resposta, index) => (questions.correct_answer === resposta ? (
                  <button
                    type="button"
                    key={ index }
                    disabled={ disable }
                    data-testid="correct-answer"
                    onClick={ this.handleOnClick }
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
                    onClick={ this.handleOnClick }
                    style={
                      css ? { border: '3px solid red' } : { color: 'black' }
                    }
                  >
                    {resposta}
                  </button>
                )),
              )}
            </div>
          </div>
        )}
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
