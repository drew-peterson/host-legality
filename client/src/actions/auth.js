import axios from 'axios';
import { FETCH_USER, CLIENT_ERRORS, FETCH_MY_PROPERTIES } from './types';
import { GQL } from '../utils/helpers';
import { LOCAL_LOGIN, LOCAL_SIGNUP } from '../graphql/mutations';

export const localSignup = (input, history) => async dispatch => {
  dispatch({ type: CLIENT_ERRORS, payload: null });

  try {
    const { localSignup } = await GQL({
      query: LOCAL_SIGNUP,
      variables: { input }
    });
    if (localSignup) {
      dispatch({
        type: FETCH_USER,
        payload: localSignup
      });
      history.push('/addProperty');
    }
  } catch (err) {
    console.log('err', err);
    dispatch({
      type: CLIENT_ERRORS,
      payload: {
        localLogin: err.errors ? 'Valid credentials required' : err[0].message
      } // component has a prop looking for localLogin
    });
  }
};

export const localLogin = (input, history) => async dispatch => {
  dispatch({ type: CLIENT_ERRORS, payload: null });
  const query = {
    query: LOCAL_LOGIN,
    variables: { input }
  };

  try {
    const { localLogin } = await GQL(query);
    dispatch({
      type: FETCH_USER,
      payload: localLogin
    });
    if (localLogin && localLogin.properties) {
      dispatch({ type: FETCH_MY_PROPERTIES, payload: localLogin.properties });
    }
  } catch ({ response }) {
    console.log('login error', response.data);
    dispatch({
      type: CLIENT_ERRORS,
      payload: { localLogin: response.data.message }
    });
  }
};

export const resetPassword = (password, token, history) => async dispatch => {
  dispatch({ type: CLIENT_ERRORS, payload: null }); // reset errors.
  try {
    const res = await axios.post(`/auth/resetPassword/${token}`, { password });
    const { user } = res.data;
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
      history.push('/');
    }
  } catch ({ response }) {
    dispatch({
      type: CLIENT_ERRORS,
      payload: response.data
    });
  }
};
