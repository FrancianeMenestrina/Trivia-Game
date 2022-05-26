import { REQUEST_API, ERROR, REQUEST_CODE, RETURN_SCORE_TOTAL } from '../actions/index';

const INITIAL_STATE = {
  questions: [],
  score: 0,
  response_code: '',
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
  case ERROR:
    return 'Deu erro na API';
  case RETURN_SCORE_TOTAL:
    return {
      ...state,
      score: action.scoreTotal,
    };
  default:
    return state;
  }
};

export default player;
