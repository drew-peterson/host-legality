import gql from 'graphql-tag';

export const LOCAL_LOGIN = gql`
  mutation LocalLogin($input: AuthFormInput!) {
    localLogin(input: $input) {
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
  mutation LocalSignup($input: AuthFormInput!) {
    localSignup(input: $input) {
      _id
      _oAuthId
      email
      properties {
        _id
        address
        status
        compliance
      }
    }
  }
`;

export const SAVE_PROPERTY_MUTATION = gql`
  mutation SaveProperty($input: NewPropertyInput!) {
    saveProperty(input: $input) {
      _id
      address
      status
      compliance
    }
  }
`;
