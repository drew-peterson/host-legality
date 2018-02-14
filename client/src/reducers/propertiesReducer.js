import { SAVE_PROPERTY, FETCH_MY_PROPERTIES } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case SAVE_PROPERTY:
      const { _id } = action.payload;
      return { ...state, [_id]: action.payload };
    case FETCH_MY_PROPERTIES:
      return action.payload;
    default:
      return state;
  }
};
