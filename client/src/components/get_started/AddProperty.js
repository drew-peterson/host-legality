import React from 'react';
import { reduxForm } from 'redux-form';
import { H1 } from '../common';

import AddPropertyForm from './AddPropertyForm';

const AddProperty = props => {
  return (
    <div>
      <H1>What is the address of your property?</H1>
      <AddPropertyForm {...props} nextBtnText="Next" />
    </div>
  );
};

export default reduxForm({
  form: 'getStarted',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(AddProperty);
