import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import Login from './pages/Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Switch>
            <Route exact path="/" component={ Login } />
          </Switch>
        </header>
      </div>
    );
  }
}

export default App;
