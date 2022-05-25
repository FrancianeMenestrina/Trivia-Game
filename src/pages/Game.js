import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionRequestApi } from '../redux/actions';
import Questions from '../components/Questions';

class Game extends Component {
/*   constructor() {
    super();
    this.state = {
      name: '',
    };
  } */
  componentDidMount() {
    const { returnApiFunc, history } = this.props;
    returnApiFunc();
    // caso pense em algo, refazer a parte do token invalido.
    const token = localStorage.getItem('token');
    if (token === 'INVALID_TOKEN') {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  render() {
    const data = JSON.parse(localStorage.getItem('ranking'));
    // console.log('data', data);
    const { questions } = this.props;
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
          <Questions questions={ questions[0] } />
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
