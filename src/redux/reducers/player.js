import { REQUEST_API, ERROR, REQUEST_CODE } from '../actions/index';

const INITIAL_STATE = {
  questions: [],
  response_code: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
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
  default:
    return state;
  }
};

export default playerReducer;
