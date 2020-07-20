import { SET_EXPOSITION, UPDATE_EXPOSITION, ADD_EXPOSITION, DELETE_EXPOSITION, SET_EXHIBIT_IN_EXPOSITION } from '../type'

const initialState = {
  items: []
};

const exposition = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPOSITION:
      return { ...state, items: action.payload };
    case ADD_EXPOSITION:
      return { ...state, items: state.items.concat(action.payload) }
    case UPDATE_EXPOSITION:
      return {
        ...state, items: state.items.map((item) => {
          if (item._id !== action.payload._id) {
            return item
          } else {
            return action.payload
          }
        })
      };
    case DELETE_EXPOSITION:
      return { ...state, items: state.items.filter((item) => item._id !== action.payload._id) }
    default: return state;
  }
};

export default exposition;