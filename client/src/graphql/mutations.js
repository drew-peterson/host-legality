import gql from 'graphql-tag';
import axios from 'axios';

export const LOCAL_LOGIN = gql`
  mutation LocalLogin($email: String!, $password: String!) {
    localLogin(email: $email, password: $password) {
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

export const GQL = async query => {
  const { data: { data } } = await axios.post('/graphql', query);
  return data;
};
