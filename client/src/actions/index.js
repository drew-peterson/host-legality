import axios from 'axios';
import { FETCH_USER, FETCH_MY_PROPERTIES } from './types';
import { FETCH_USER_QUERY } from '../graphql/queries';

export * from './properties';
export * from './auth';
export * from './flow';

const GQL = async query => {
  const { data: { data } } = await axios.post('/graphql', query);
  return data;
};

export const fetchUser = () => async dispatch => {
  const query = {
    query: FETCH_USER_QUERY
  };

  const { user } = await GQL(query);

  if (user && user.properties) {
    // delete user.properties; //
    dispatch({ type: FETCH_MY_PROPERTIES, payload: user.properties });
  }
  dispatch({ type: FETCH_USER, payload: user });

  // const res = await axios.get('/api/current_user');
  // dispatch({ type: FETCH_USER, payload: res.data });

  // if (res.data) {
  //   const propertyRes = await axios.get('/api/property');
  //   dispatch({ type: FETCH_MY_PROPERTIES, payload: propertyRes.data });
  // }
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
