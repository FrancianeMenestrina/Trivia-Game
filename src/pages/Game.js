import React, { Component } from 'react';

class Game extends Component {
/*   constructor() {
    super();
    this.state = {
      name: '',
    };
  } */

  render() {
    const data = JSON.parse(localStorage.getItem('info'));
    console.log('data', data);
    return (
      <div>
        <header />
        <h1>GAME</h1>
        <img
          src={ data.ranking[0].picture }
          alt="Imagem-Token"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ data.ranking[0].name }</p>
        <p data-testid="header-score">{ data.ranking[0].score }</p>
      </div>
    );
  }
}

export default Game;
