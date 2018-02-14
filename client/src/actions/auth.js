import axios from 'axios';
import { FETCH_USER, CLIENT_ERRORS } from './types';

export const localSignup = (
  { email, password, firstName, lastName },
  history
) => async dispatch => {
  dispatch({ type: CLIENT_ERRORS, payload: null });
  try {
    const res = await axios.post('/auth/localSignup', {
      email,
      password,
      firstName,
      lastName
    });

    const { user } = res.data;

    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
      history.push('/addProperty');
    }
  } catch ({ response }) {
    dispatch({
      type: CLIENT_ERRORS,
      payload: response.data
    });
  }
};

export const localLogin = (
  { email, password, firstName, lastName },
  history
) => async dispatch => {
  dispatch({ type: CLIENT_ERRORS, payload: null }); // reset errors.
  try {
    const res = await axios.post('/auth/localLogin', {
      email,
      password
    });

    const { user } = res.data;

    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    }
  } catch ({ response }) {
    console.log('signupError', response.data);
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
