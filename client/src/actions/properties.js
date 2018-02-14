import axios from 'axios';
import { FETCH_MY_PROPERTIES, SAVE_PROPERTY } from './types';

export const fetchMyProperties = () => async dispatch => {
  const res = await axios.get('/api/property');
  dispatch({ type: FETCH_MY_PROPERTIES, payload: res.data });
};

export const saveProperty = (values, history) => async dispatch => {
  const res = await axios.post('/api/property', values);
  dispatch({ type: SAVE_PROPERTY, payload: res.data });
  history.push('/dashboard');
};

export const selectProperty = propertyId => async dispatch => {
  console.log('propertyId', propertyId);
  // const res = await axios.get('/api/current_user');
  // dispatch({ type: FETCH_USER, payload: res.data });
};
