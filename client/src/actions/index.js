import axios from 'axios';
import { FETCH_USER, FETCH_MY_PROPERTIES } from './types';
import { FETCH_USER_QUERY } from '../graphql/queries';
import { GQL } from '../utils/helpers';

export * from './properties';
export * from './auth';
export * from './flow';

export const fetchUser = () => async dispatch => {
  const query = { query: FETCH_USER_QUERY };
  const { user } = await GQL(query);

  dispatch({ type: FETCH_USER, payload: user });
  if (user && user.properties) {
    dispatch({ type: FETCH_MY_PROPERTIES, payload: user.properties });
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
