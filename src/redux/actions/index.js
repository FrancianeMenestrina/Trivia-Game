export const REQUEST_API = 'REQUEST_API';
export const ERROR = 'ERROR';
export const REQUEST_CODE = 'REQUEST_CODE';

export const actionApiReturn = (returnAPI) => ({ type: REQUEST_API, returnAPI });
export const actionError = () => ({ type: ERROR });
export const actionResponse = (returnAPICode) => ({ type: REQUEST_CODE, returnAPICode });

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
