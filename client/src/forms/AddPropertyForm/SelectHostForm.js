import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
// import FontIcon from 'material-ui/FontIcon';
import { Button, rem } from '../../components/common';

const SelectHostForm = props => {
  const { handleSubmit, btnText, pristine, invalid, submitting } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Field name="host" component={plateformItem} />

      <div className="center-xs">
        <Button
          className="addPropertyBtn"
          type="submit"
          disable={pristine || invalid | submitting}
        >
          {btnText}
        </Button>
      </div>
    </Form>
  );
};

const plateformItem = props => {
  const { input, meta: { touched, error } } = props;
  const platforms = [
    { host: 'airbnb', img: 'home' },
    { host: 'HouseHost', img: 'adb' }
  ];

  return (
    <div>
      {_.map(platforms, ({ host, img }) => {
        return (
          <div key={host}>
            <input id={host} type="radio" {...input} value={host} />
            <label htmlFor={host}>{host}</label>
          </div>
        );
      })}
      {touched && error && <ErrorText id="host_error">{error}</ErrorText>}
    </div>
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

const ErrorText = styled.p`
  color: rgb(244, 67, 54);
  font-size: 12px;
  margin-top: 5px;
`;

function validate({ host }) {
  const errors = {};
  if (!host) {
    errors.host = 'please select a host';
  }
  return errors;
}

export default reduxForm({
  validate,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(SelectHostForm);
