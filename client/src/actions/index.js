import axios from 'axios';
import { FETCH_USER, FETCH_MY_PROPERTIES } from './types';

export * from './properties';
export * from './auth';
export * from './flow';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
  if (res.data) {
    const propertyRes = await axios.get('/api/property');
    dispatch({ type: FETCH_MY_PROPERTIES, payload: propertyRes.data });
  }
};

export const stripeHandleToken = ({
  token,
  amount,
  description
}) => async dispatch => {
  // need to send form...
  const res = await axios.post('/api/stripe', { token, amount, description });
  console.log('res', res.data);

  // update properties

  // dispatch({ type: FETCH_USER, payload: res.data });
};
