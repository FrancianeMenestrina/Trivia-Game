# Trivia Project 
# Contexto
Nesse projeto desenvolvemos um jogo de perguntas e respostas baseado no jogo Trivia (tipo um show do milhão americano) utilizando React e Redux. A partir das demandas, temos uma aplicação onde a pessoa usuária poderá:
- Logar no jogo e, se o email tiver cadastro no site Gravatar, ter sua foto associada ao perfil da pessoa usuária.
- Acessar a página referente ao jogo, onde se deverá escolher uma das respostas disponíveis para cada uma das perguntas apresentadas. A resposta deve ser marcada antes do contador de tempo chegar a zero, caso contrário a resposta deverá ser considerada errada.
- Ser redirecionada, após 5 perguntas respondidas, para a tela de score, onde o texto mostrado depende do número de acertos.
- Visualizar a página de ranking, se quiser, ao final de cada jogo.
- Configurar algumas opções para o jogo em uma tela de configuração acessível a partir do cabeçalho do app.
## Tecnologias usadas
Front-end:
> Desenvolvido usando: React, Redux, RTL (React Testing Library)
## Instalando Dependências
```bash
cd Trivia-Game
npm install
```
## Executando aplicação
  A aplicação estará rodando na porta 3000: http://localhost:3000/ do navegador
  ```
  Dentro do bash execute: npm start
  ```
## Executando Testes
* Para rodar todos os testes:
  ```
  npm test
  ```
