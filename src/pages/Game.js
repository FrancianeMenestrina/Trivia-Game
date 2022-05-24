import React, { Component } from 'react';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  render() {
    const { name } = this.state;
    return (
      <p>{ name }</p>
    );
  }
}

export default Game;
