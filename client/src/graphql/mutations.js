import gql from 'graphql-tag';

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

export const LOCAL_SIGNUP = gql`
  mutation LocalSignup($email: String!, $password: String!) {
    localSignup(email: $email, password: $password) {
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
