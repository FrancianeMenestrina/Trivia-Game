import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionRequestApi } from '../redux/actions';
import Questions from '../components/Questions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      soma: 0,
      respostas: [],
      countDown: 30,
      disable: false,
      over: false,
      btnNext: false,
      css: false,
    };
  }

  async componentDidMount() {
    const { returnApiFunc, history } = this.props;
    await returnApiFunc();
    // caso pense em algo, refazer a parte do token invalido.
    const token = localStorage.getItem('token');
    if (token === 'INVALID_TOKEN') {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.ordemAleatoria();
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ countDown: prevState.countDown - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const TIME_LIMIT = 0;
    const { countDown } = this.state;
    if (countDown === TIME_LIMIT) {
      this.setState({ disable: true, countDown: 30, over: true, btnNext: true });
      clearInterval(this.intervalId);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleOnClick = () => {
    this.setState({ css: true, btnNext: true });
    clearInterval(this.intervalId);
  }

  ordemAleatoria = () => {
    const { questions } = this.props;
    const { soma } = this.state;
    if (!questions) {
      return null;
    }
    const arrayAnswers = [questions[soma].correct_answer,
      ...questions[soma].incorrect_answers];
    const ZERO_CINCO = 0.5;
    arrayAnswers.sort(() => Math.random() - ZERO_CINCO);
    this.setState({ respostas: arrayAnswers });
    return arrayAnswers;
  }

  onClickNext = () => {
    const { soma } = this.state;
    this.setState({
      soma: soma + 1,
    }, () => this.ordemAleatoria());
    this.setState({ css: false, countDown: 30, btnNext: false });
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ countDown: prevState.countDown - 1 }));
    }, ONE_SECOND);
  }

  render() {
    const data = JSON.parse(localStorage.getItem('ranking'));
    // console.log('data', data);
    const { questions } = this.props;
    const { soma, css, disable, respostas, btnNext, over, countDown } = this.state;
    return (
      <div>
        <header />
        <h1>GAME</h1>
        <img
          src={ data[0].picture }
          alt="Imagem-Token"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ data[0].name }</p>
        <p data-testid="header-score">{ data[0].score }</p>
        <div>
          <Questions
            questions={ questions[soma] }
            onClickNext={ this.onClickNext }
            css={ css }
            disable={ disable }
            respostas={ respostas }
            btnNext={ btnNext }
            over={ over }
            countDown={ countDown }
            handleOnClick={ this.handleOnClick }
            ordemAleatoria={ this.ordemAleatoria }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.playerReducer.questions,
  responseCode: state.playerReducer.response_code,
});

const mapDispatchToProps = (dispatch) => ({
  returnApiFunc: () => dispatch(actionRequestApi()),
});

Game.propTypes = {
  returnApiFunc: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
