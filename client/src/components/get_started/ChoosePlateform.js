import React from 'react';
import { reduxForm } from 'redux-form';
// import styled from 'styled-components';

import { H1 } from '../common';
import HostingPlateformForm from './HostingPlatformForm';

const ChoosePlateform = props => {
  return (
    <div>
      <H1>Which platform are you using for this property?</H1>

      <HostingPlateformForm {...props} btnText="Next" name="host" />
    </div>
  );
};

export default reduxForm({
  form: 'getStarted',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(ChoosePlateform);
