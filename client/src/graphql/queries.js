import gql from 'graphql-tag';
import axios from 'axios';
// import { CURRENT_USER } from '../fragments';

export const FETCH_USER_QUERY = gql`
  {
    user {
      _id
      _oAuthId
      email
      properties
    }
  }
`;

export const GQL = async query => {
  const { data: { data } } = await axios.post('/graphql', query);
  return data;
};
