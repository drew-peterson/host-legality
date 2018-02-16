import {
  SAVE_PROPERTY,
  FETCH_MY_PROPERTIES,
  MAKE_PAYMENT_PROPERTY,
  FLOW_SUBMIT_STEP
} from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case SAVE_PROPERTY:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_MY_PROPERTIES:
      return action.payload;
    case MAKE_PAYMENT_PROPERTY:
      return { ...state, [action.payload._id]: action.payload };
    case FLOW_SUBMIT_STEP:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};
