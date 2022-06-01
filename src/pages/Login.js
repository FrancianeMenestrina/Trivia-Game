import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
// import { Button } from 'reactstrap';
import { actionSaveEmail, actionSavePicture,
  actionSaveName, actionScoreTotal } from '../redux/actions';
import './Login.css';

// const { Jumbotron } = ReactBootstrap;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
      buttonDisable: true,
    };
  }

  componentDidMount() {
    const { returnScoreTotal } = this.props;
    returnScoreTotal(0);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.verifyForms);
  }

  handleButton = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    const { name, gravatarEmail } = this.state;
    const { returnEmail, returnName, returnPicture } = this.props;
    returnEmail(gravatarEmail);
    returnName(name);
    const criptoEmail = md5(gravatarEmail).toString();
    returnPicture(`https://www.gravatar.com/avatar/${criptoEmail}`);
    localStorage.setItem('token', data.token);
    const { history } = this.props;
    history.push('/game');
  }

  verifyForms = () => {
    const { name, gravatarEmail } = this.state;
    if (name.length > 0 && gravatarEmail.length > 0) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ buttonDisable: true });
    }
  }

  render() {
    const { buttonDisable } = this.state;
    const { history } = this.props;
    return (
      <main>
        <form className="form-login">
          <div className="div-name">
            <label htmlFor="name" className="input-login">
              Nome:
              <input
                id="name"
                name="name"
                type="text"
                data-testid="input-player-name"
                onChange={ this.handleChange }
                className="form-control"
              />
            </label>
          </div>
          <div className="div-email">
            <label htmlFor="gravatarEmail" className="input-login">
              Email:
              <input
                id="gravatarEmail"
                name="gravatarEmail"
                type="email"
                data-testid="input-gravatar-email"
                onChange={ this.handleChange }
                className="form-control input-login"
              />
            </label>
          </div>
          <div className="button-play">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ buttonDisable }
              onClick={ this.handleButton }
              className="btn-play"
            >
              Play
            </button>
          </div>
          <div className="button-settings">
            <button
              type="button"
              className="btn-settings"
              data-testid="btn-settings"
              onClick={ () => { history.push('/settings'); } }
            >
              Settings
            </button>
          </div>
        </form>
      </main>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  returnEmail: (email) => dispatch(actionSaveEmail(email)),
  returnName: (name) => dispatch(actionSaveName(name)),
  returnPicture: (picture) => dispatch(actionSavePicture(picture)),
  returnScoreTotal: (score) => dispatch(actionScoreTotal(score)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  returnEmail: PropTypes.func.isRequired,
  returnName: PropTypes.func.isRequired,
  returnPicture: PropTypes.func.isRequired,
  returnScoreTotal: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
