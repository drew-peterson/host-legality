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
