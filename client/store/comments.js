import axios from 'axios';

const comments = (state = [], action) => {
  if (action.type === 'SET_COMMENTS') {
    return action.comments;
  }
  if (action.type === 'ADD_COMMENT') {
    return [...state, action.comment];
  }
  if (action.type === 'DELETE_COMMENT') {
    return [...state.filter((list) => list.id !== action.id)];
  }
  return state;
};

export const setComments = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/comments/${id}`);
    dispatch({ type: 'SET_COMMENTS', comments: response.data });
  };
};

export const addComment = (listId, userId, data) => {
  return async (dispatch) => {
    const response = await axios.post(
      `/api/comments/${listId}/${userId}`,
      data
    );
    dispatch({ type: 'ADD_COMMENT', comment: response.data });
  };
};

export const deleteComment = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/comments/${id}`);
    dispatch({ type: 'DELETE_COMMENT', id });
  };
};

// export const deleteNnList = (id) => {
//   return async (dispatch) => {
//     await axios.delete(`/api/nnlists/${id}`);
//     dispatch({ type: 'DELETE_NNLIST', id });
//   };
// };
export default comments;
