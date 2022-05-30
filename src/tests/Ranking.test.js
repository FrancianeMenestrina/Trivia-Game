import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';
import App from '../App';
import { mockLocalStorageRanking} from './helpers/Mock';
describe('Testando a página de Ranking', () => {
  const playerOne = mockLocalStorageRanking[1];
  const playerTwo = mockLocalStorageRanking[0];
  localStorage.setItem('ranking', JSON.stringify(mockLocalStorageRanking));
  // console.log(playerUm);
  // console.log(JSON.parse(localStorage.getItem('ranking')));


  it('Testa se existe um cabeçalho com a palavra "Ranking" ', () => {
    renderWithRouterAndRedux(<App />, '', '/ranking');
    expect(screen.getByRole('heading', { name: /ranking/i, level: 1})).toBeInTheDocument();
  })
  it('Testa se são exibidos as imagens dos jogadores,  ', () => {
    renderWithRouterAndRedux(<App />, '', '/ranking');
    const avatarPlayers = (screen.getAllByRole('img', { name: "Imagem-Token"}));
    expect(avatarPlayers.length).toBe(2);
    expect(avatarPlayers[0]).toBeInTheDocument();
    expect(avatarPlayers[1]).toBeInTheDocument();
  })

  it('Testa se o ranking é exibido em ordem decrescente e seus respectivos nomes,  ', () => {
    renderWithRouterAndRedux(<App />, '', '/ranking');
    const firstPlayerName = (screen.getByTestId('player-name-0'))
    const secondPlayerName = (screen.getByTestId('player-name-1'))
    expect(firstPlayerName).toBeInTheDocument();
    expect(secondPlayerName).toBeInTheDocument();
    expect(firstPlayerName.innerHTML).toBe(playerOne.name);
    expect(secondPlayerName.innerHTML).toBe(playerTwo.name);
  })

  it('Testa se o ranking é exibido em ordem decrescente e seus respectivos scores,  ', () => {
    renderWithRouterAndRedux(<App />, '', '/ranking');
    const firstPlayerScore = (screen.getByTestId('player-score-0'))
    const secondPlayerScore = (screen.getByTestId('player-score-1'))
    expect(firstPlayerScore).toBeInTheDocument();
    expect(secondPlayerScore).toBeInTheDocument();
    expect(Number(firstPlayerScore.innerHTML)).toBe(playerOne.score);
    expect(Number(secondPlayerScore.innerHTML)).toBe(playerTwo.score);
  })
  it('Testa se o botão "Início" direciona para a URL "/"  ', () => {
    const { history } =  renderWithRouterAndRedux(<App />, '', '/ranking');
    const buttonInicio = screen.getByRole('button', {name: /início/i});
    userEvent.click(buttonInicio);
    expect(history.location.pathname).toBe('/');
})
});

