import axios from 'axios';

const santaPower = (state = {}, action) => {
  if (action.type === 'SET_USER') {
    return action.user[0];
  }
  return state;
};

export const setUser = (username) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/users/${username}`);
    dispatch({ type: 'SET_USER', user: response.data });
  };
};

export default santaPower;
