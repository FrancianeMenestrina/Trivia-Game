import React from 'react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('Testando a tela de Login', () => {
    it('Testa se a página "Login" é renderizada na URL "/"', () => {
        const { history } = renderWithRouterAndRedux(<Login />, {
            initialEntries: ['/'], 
        });
        expect(history.location.pathname).toBe('/');
    });
    it('Testa se na página "Login" possui o input "Nome e Email" ', () => {
        renderWithRouterAndRedux(<Login />, {
            initialEntries: ['/'], 
        });
        const nameEl = screen.getByLabelText(/Nome:/i);
        const emailEl = screen.getByLabelText(/Email:/i)
        expect(nameEl).toBeInTheDocument();
        expect(emailEl).toBeInTheDocument();
    });
    it('Testa se na página "Login" existem os botões "Play e Settings" ', () => {
        renderWithRouterAndRedux(<Login />, {
            initialEntries: ['/'], 
        });
        const buttonPlay = screen.getByRole('button', {name: /Play/i});
        const buttonSettings = screen.getByRole('button', {name: /Settings/i})
        expect(buttonPlay).toBeInTheDocument();
        expect(buttonSettings).toBeInTheDocument();
    });
    it('Testa se clicando no botão "Play" a página é redirecionada para a URL"/game" ', async () => {
        
        const retornoAPI = [{ 
            response_code:0,
            response_message:"Token Generated Successfully!",
            token:"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6" 
        }];

        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(retornoAPI),
          }));

        const { history } = renderWithRouterAndRedux(<App />);

        const buttonPlay = screen.getByRole('button', {name: /Play/i});
        const nameEl = screen.getByLabelText(/Nome:/i);
        const emailEl = screen.getByLabelText(/Email:/i);
        expect(buttonPlay).toBeDisabled();

        userEvent.type(nameEl, 'Teste Login');
        userEvent.type(emailEl, 'texte@teste.com');
        expect(buttonPlay).toBeEnabled();      
 
        userEvent.click(buttonPlay);
        await waitFor(() => {
            const { pathname } = history.location;
            console.log(pathname);
            expect(pathname).toBe('/game')
        });       
    });
    it('Testa se clicando no botão "Settings" a página é redirecionada para a URL"/settings" ', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const buttonSettings = screen.getByRole('button', {name: /Settings/i});
        userEvent.click(buttonSettings);
        expect(history?.location.pathname).toBe('/settings');
    });
});
