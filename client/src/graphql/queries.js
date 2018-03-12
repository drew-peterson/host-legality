import gql from 'graphql-tag';
// import { CURRENT_USER } from '../fragments';

export const FETCH_USER_QUERY = gql`
  {
    user {
      _id
      _oAuthId
      email
      properties {
        _id
        address
        status
        compliance
        _user {
          _id
        }
      }
    }
  }
`;
