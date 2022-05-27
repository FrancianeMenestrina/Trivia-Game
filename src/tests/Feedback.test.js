import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { stateAssertions4, stateAssertions2, stateAssertions3 } from './helpers/Mock';
describe('Testando a página de feedback', () => {
  it('Testa se existe um cabeçalho', () => {
    renderWithRouterAndRedux(<App />, stateAssertions3, '/feedback');
    expect(screen.getByTestId('header-profile-picture')).toBeInTheDocument();
    expect(screen.getByTestId('header-player-name')).toBeInTheDocument();
    expect(screen.getByTestId('header-score')).toBeInTheDocument();
  })
  it('Testa se exibe o score do jogagor', () => {
    renderWithRouterAndRedux(<App />, stateAssertions3, '/feedback');
    expect(screen.getByTestId('feedback-total-question')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-total-score')).toBeInTheDocument();
  })
  it('Testa se o botão "Play Again" leva para a URL "/" ', () => {
    const { history } = renderWithRouterAndRedux(<App />, stateAssertions3, '/feedback');
    expect(screen.getByTestId("btn-play-again")).toBeInTheDocument;
    userEvent.click(screen.getByTestId("btn-play-again"));
    expect(history.location.pathname).toBe('/')
  })
  it('Testa se o botão Ranking leva para a URL "/ranking" ', () => {
    const { history } = renderWithRouterAndRedux(<App />, stateAssertions3, '/feedback');
    expect(screen.getByTestId("btn-ranking")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("btn-ranking"));
    expect(history.location.pathname).toBe('/ranking');
  })
  it('Testa se é exibida a mensagem "Well Done!" ', () => {
    renderWithRouterAndRedux(<App />, stateAssertions4, '/feedback');
    expect(screen.getByRole('heading', { level: 3, name: /well done!/i })).toBeInTheDocument();
  })
  it('Testa se é exibida a mensagem "Could be Better..." ', () => {
    renderWithRouterAndRedux(<App />, stateAssertions2, '/feedback');
    expect(screen.getByRole('heading', { level: 3, name: /could be better.../i })).toBeInTheDocument();
  })
})