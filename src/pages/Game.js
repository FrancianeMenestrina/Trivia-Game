import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionRequestApi, actionScoreTotal, actionAcertos } from '../redux/actions';
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
      somaTotal: 0,
      corretas: 0,
    };
  }

  async componentDidMount() {
    const { returnApiFunc } = this.props;
    await returnApiFunc();
    this.tokenValidation();
    this.ordemAleatoria();
    this.questionTimer();
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

  handleOnClick = ({ target }) => {
    this.setState({ css: true, btnNext: true });
    clearInterval(this.intervalId);
    const { value } = target;
    this.sumScore(value);
  }

  ordemAleatoria = () => {
    const { questions } = this.props;
    const { soma } = this.state;
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
    }, () => this.pageFeedback());
    this.setState({ css: false, countDown: 30, btnNext: false });
    this.questionTimer();
  }

  questionTimer = () => {
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ countDown: prevState.countDown - 1 }));
    }, ONE_SECOND);
  }

  // caso pense em algo, refazer a parte do token invalido.
  tokenValidation = () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    if (token === 'INVALID_TOKEN') {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  sumScore = (value) => {
    const { countDown, soma } = this.state;
    const { questions } = this.props;
    let sum = 0;
    const difficult = questions[soma].difficulty;
    let difficultPoint = 0;
    const difficultHard = 3;
    const difficultMedium = 2;
    const difficultEasy = 1;
    const numberGeneric = 10;

    if (value === questions[soma].correct_answer) {
      const { acertosFunc } = this.props;
      this.setState((estadoAnterior) => ({
        corretas: estadoAnterior.corretas + 1,
      }), () => {
        const { corretas } = this.state;
        acertosFunc(corretas);
      });
      if (difficult === 'hard') {
        difficultPoint = difficultHard;
      }
      if (difficult === 'medium') {
        difficultPoint = difficultMedium;
      }
      if (difficult === 'easy') {
        difficultPoint = difficultEasy;
      }
      sum += (numberGeneric + (countDown * difficultPoint));
      this.setState((prevState) => ({
        somaTotal: prevState.somaTotal + sum,
      }), () => {
        const { somaTotal } = this.state;
        const { scoreTotalFunc } = this.props;
        scoreTotalFunc(somaTotal);
      });
      return sum;
    }
  }

  pageFeedback = () => {
    const { soma } = this.state;
    const { history } = this.props;
    const numberFive = 5;

    if (soma === numberFive) {
      history.push('/feedback');
      this.saveLocalStorage();
    } else {
      this.ordemAleatoria();
    }
  };

  saveLocalStorage = () => {
    const { returnName, scoreTotal, returnPicture } = this.props;

    const ranking = JSON.parse(localStorage.getItem('ranking'));

    if (!ranking) {
      localStorage.setItem('ranking', JSON.stringify([
        {
          name: returnName,
          score: scoreTotal,
          picture: returnPicture,
        },
      ]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([...ranking,
        {
          name: returnName,
          score: scoreTotal,
          picture: returnPicture,
        },
      ]));
    }
  }

  render() {
    const { questions, scoreTotal, returnName, returnPicture } = this.props;
    const { soma, css, disable, respostas, btnNext, over, countDown } = this.state;
    return (
      <div>
        <header />
        <h1>GAME</h1>
        <img
          src={ returnPicture }
          alt="Imagem-Token"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ returnName }</p>
        <p data-testid="header-score">{ scoreTotal }</p>
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
  questions: state.player.questions,
  responseCode: state.player.response_code,
  scoreTotal: state.player.score,
  returnName: state.player.name,
  returnPicture: state.player.picture,
});

const mapDispatchToProps = (dispatch) => ({
  returnApiFunc: () => dispatch(actionRequestApi()),
  scoreTotalFunc: (scoreTotal) => dispatch(actionScoreTotal(scoreTotal)),
  acertosFunc: (acertos) => dispatch(actionAcertos(acertos)),
});

Game.propTypes = {
  returnApiFunc: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  scoreTotalFunc: PropTypes.func.isRequired,
  scoreTotal: PropTypes.string.isRequired,
  acertosFunc: PropTypes.func.isRequired,
  returnName: PropTypes.string.isRequired,
  returnPicture: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
