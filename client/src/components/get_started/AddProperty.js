import React from 'react';
import { reduxForm, Field } from 'redux-form';
import styled from 'styled-components';
import { Button, H1, Container, Input, rem } from '../common';
import PlacesAutocomplete from '../../utils/GoogleAutocomplete';

const AddProperty = props => {
  const { handleSubmit } = props;
  const autoCompleteCb = address => {
    console.log('address', address);
  };
  return (
    <Container>
      <H1>What is the address of your property?</H1>
      <Form onSubmit={handleSubmit}>
        <Field
          className="form-input"
          name="property"
          cb={autoCompleteCb}
          component={PlacesAutocomplete}
          placeholder="enter property address"
        />

        <Field
          className="form-input"
          name="unitNumber"
          label="Unit number"
          component={Input}
          placeholder="enter unit number"
        />
        <div className="center-xs">
          <Button className="addPropertyBtn" type="submit">
            Next
          </Button>
        </div>
      </Form>
    </Container>
  );
};

const Form = styled.form`
  margin-top: ${rem(20)};

  &.form-input {
    margin-top: ${rem(20)};
  }

  &.addPropertyBtn {
    margin-top: ${rem(20)};
  }
`;

export default reduxForm({
  form: 'getStarted',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(AddProperty);
