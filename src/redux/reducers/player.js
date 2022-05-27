import { REQUEST_API, ERROR, REQUEST_CODE,
  RETURN_SCORE_TOTAL, ACERTOS, RETURN_EMAIL,
  RETURN_PICTURE, RETURN_NAME } from '../actions/index';

const INITIAL_STATE = {
  questions: [],
  score: 0,
  response_code: '',
  assertions: 0,
  name: '',
  gravatarEmail: '',
  picture: '',

};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      questions: action.returnAPI,
    };
  case REQUEST_CODE:
    return {
      ...state,
      response_code: action.returnAPICode,
    };
  case ACERTOS:
    return {
      ...state,
      assertions: action.acertos,
    };
  case ERROR:
    return 'Deu erro na API';
  case RETURN_SCORE_TOTAL:
    return {
      ...state,
      score: action.scoreTotal,
    };
  case RETURN_EMAIL:
    return {
      ...state,
      gravatarEmail: action.returnEmail,
    };
  case RETURN_NAME:
    return {
      ...state,
      name: action.returnName,
    };
  case RETURN_PICTURE:
    return {
      ...state,
      picture: action.returnPicture,
    };
  default:
    return state;
  }
};

export default player;
