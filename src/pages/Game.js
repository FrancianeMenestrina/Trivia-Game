import React, { Component } from 'react';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
    };
  }

  render() {
    const { nome } = this.state;
    return (
      <p>{ nome }</p>
    );
  }
}

export default Game;
