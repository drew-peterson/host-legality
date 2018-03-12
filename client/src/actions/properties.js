import axios from 'axios';
import {
  // FETCH_MY_PROPERTIES,
  SAVE_PROPERTY,
  MAKE_PAYMENT_PROPERTY,
  CLIENT_ERRORS
} from './types';

import { GQL } from '../utils/helpers';
import { SAVE_PROPERTY_MUTATION } from '../graphql/mutations';

// export const fetchMyProperties = () => async dispatch => {
//   console.log('fetchMyProperties', fetchMyProperties);
//   // graphql properties...
//   const res = await axios.get('/api/property');
//   dispatch({ type: FETCH_MY_PROPERTIES, payload: res.data });
// };

export const saveProperty = (variables, history) => async dispatch => {
  try {
    const { saveProperty } = await GQL({
      query: SAVE_PROPERTY_MUTATION,
      variables
    });
    dispatch({ type: SAVE_PROPERTY, payload: saveProperty });
    history.push('/dashboard');
  } catch (err) {
    console.log('saveProperty err', err);
  }
};

export const selectProperty = propertyId => async dispatch => {
  console.log('propertyId', propertyId);
  // const res = await axios.get('/api/current_user');
  // dispatch({ type: FETCH_USER, payload: res.data });
};

export const makePaymentProperty = ({
  token,
  amount,
  description,
  property,
  history
}) => async dispatch => {
  try {
    const res = await axios.post('/api/property/makePayment', {
      token,
      amount,
      description,
      property
    });
    history.push('/dashboard');
    dispatch({ type: MAKE_PAYMENT_PROPERTY, payload: res.data });
  } catch (err) {
    dispatch({ type: CLIENT_ERRORS, payload: err });
  }
};
