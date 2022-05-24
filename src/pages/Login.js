import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
      buttonDisable: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.verifyForms);
  }

  handleButton = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    console.log('data', data);
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
    return (
      <main>
        <h2>Login</h2>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              id="name"
              name="name"
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="gravatarEmail">
            Email:
            <input
              id="gravatarEmail"
              name="gravatarEmail"
              type="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ buttonDisable }
            onClick={ this.handleButton }
          >
            Play
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
