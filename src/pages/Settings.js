import React, { Component } from 'react';
import logo from '../trivia.png';
import './Settings.css';

class Settings extends Component {
  render() {
    return (
      <div className="App-gamer">
        <img src={ logo } className="App-logo-game" alt="logo" />
        <h1 data-testid="settings-title" className="settings">- Settings -</h1>
      </div>
    );
  }
}

export default Settings;
