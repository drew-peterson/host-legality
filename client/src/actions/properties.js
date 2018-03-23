import {
  // FETCH_MY_PROPERTIES,
  SAVE_PROPERTY,
  MAKE_PAYMENT_PROPERTY,
  CLIENT_ERRORS
} from './types';
import { reset } from 'redux-form';
import { GQL } from '../utils/helpers';
import {
  SAVE_PROPERTY_MUTATION,
  STRIPE_PROPERTY_PAYMENT
} from '../graphql/mutations';

// export const fetchMyProperties = () => async dispatch => {
//   console.log('fetchMyProperties', fetchMyProperties);
//   // graphql properties...
//   const res = await axios.get('/api/property');
//   dispatch({ type: FETCH_MY_PROPERTIES, payload: res.data });
// };

export const saveProperty = (input, history) => async dispatch => {
  try {
    const { saveProperty } = await GQL({
      query: SAVE_PROPERTY_MUTATION,
      variables: { input }
    });
    dispatch({ type: SAVE_PROPERTY, payload: saveProperty });
    dispatch(reset('addPropertyForm')); // reset form because no unmount on form...
    history.push('/dashboard');
  } catch (err) {
    console.log('saveProperty err', err);
  }
};

export const selectProperty = propertyID => async dispatch => {
  console.log('propertyID', propertyID);
  // const res = await axios.get('/api/current_user');
  // dispatch({ type: FETCH_USER, payload: res.data });
};

export const makePaymentProperty = ({
  propertyID,
  stripe,
  history
}) => async dispatch => {
  const query = {
    variables: {
      propertyID,
      stripe
    },
    query: STRIPE_PROPERTY_PAYMENT
  };
  try {
    const { propertyMakePayment } = await GQL(query);
    history.push('/dashboard');
    dispatch({ type: MAKE_PAYMENT_PROPERTY, payload: propertyMakePayment });
  } catch (err) {
    dispatch({ type: CLIENT_ERRORS, payload: err });
  }
};
