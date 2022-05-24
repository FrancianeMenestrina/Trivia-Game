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
      <div>
        <p>{ name }</p>
        <h1>GAME</h1>

      </div>

    );
  }
}

export default Game;
