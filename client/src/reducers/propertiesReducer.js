import { SAVE_PROPERTY, FETCH_MY_PROPERTIES } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case SAVE_PROPERTY:
      return { ...state, ...action.payload };
    case FETCH_MY_PROPERTIES:
      return action.payload;
    default:
      return state;
  }
};
