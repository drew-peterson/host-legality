import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import propertiesReducer from './propertiesReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  errors: errorsReducer,
  properties: propertiesReducer
});
