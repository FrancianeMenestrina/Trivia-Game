export const REQUEST_API = 'REQUEST_API';
export const ERROR = 'ERROR';
export const REQUEST_CODE = 'REQUEST_CODE';
export const RETURN_SCORE_TOTAL = 'RETURN_SCORE_TOTAL';
export const ACERTOS = 'ACERTOS';
export const RETURN_NAME = 'RETURN_NAME';
export const RETURN_EMAIL = 'RETURN_EMAIL';
export const RETURN_PICTURE = 'RETURN_PICTURE';

export const actionApiReturn = (returnAPI) => ({ type: REQUEST_API, returnAPI });
export const actionError = () => ({ type: ERROR });
export const actionResponse = (returnAPICode) => ({ type: REQUEST_CODE, returnAPICode });
export const actionScoreTotal = (scoreTotal) => (
  { type: RETURN_SCORE_TOTAL, scoreTotal });
export const actionAcertos = (acertos) => ({ type: ACERTOS, acertos });
export const actionSaveName = (returnName) => ({ type: RETURN_NAME, returnName });
export const actionSaveEmail = (returnEmail) => ({ type: RETURN_EMAIL, returnEmail });
export const actionSavePicture = (returnPicture) => (
  { type: RETURN_PICTURE, returnPicture });

export const actionRequestApi = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    // console.log(data);
    dispatch(actionApiReturn(data.results));
    dispatch(actionResponse(data.response_code));
  } catch (error) {
    dispatch(actionError());
  }
};
