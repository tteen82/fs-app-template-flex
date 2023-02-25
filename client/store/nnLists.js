import axios from 'axios';
import history from '../history';

const nnLists = (state = [], action) => {
  if (action.type === 'SET_NNLISTS') {
    return action.nnLists;
  }
  if (action.type === 'ADD_NNLIST') {
    return [...state, action.nnList];
  }
  if (action.type === 'DELETE_NNLIST') {
    return [...state.filter((list) => list.id !== action.id)];
  }
  if (action.type === 'SET_SANTA') {
    return action.nnLists;
  }
  return state;
};

export const setNnlists = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/nnlists/${id}`);
    dispatch({ type: 'SET_NNLISTS', nnLists: response.data });
  };
};

export const addNnlist = (id, data) => {
  return async (dispatch) => {
    const response = await axios.post(`/api/nnlists/${id}`, data);
    dispatch({ type: 'ADD_NNLIST', nnList: response.data });
    history.push('./');
  };
};

export const deleteNnList = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/nnlists/${id}`);
    dispatch({ type: 'DELETE_NNLIST', id });
    history.push('./');
  };
};

export const setSantaLists = () => {
  return async (dispatch) => {
    const response = await axios.get(`/api/nnlists`);
    dispatch({ type: 'SET_SANTA', nnLists: response.data });
  };
};
export default nnLists;
