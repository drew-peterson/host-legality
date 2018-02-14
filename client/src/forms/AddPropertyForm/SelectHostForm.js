import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
// import FontIcon from 'material-ui/FontIcon';
import { Button, rem } from '../../components/common';

const SelectHostForm = props => {
  const { handleSubmit, btnText } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Field name="host" component={plateformItem} />

      <div className="center-xs">
        <Button className="addPropertyBtn" type="submit">
          {btnText}
        </Button>
      </div>
    </Form>
  );
};

const plateformItem = props => {
  const { input } = props;
  const platforms = [
    { host: 'airbnb', img: 'home' },
    { host: 'HouseHost', img: 'adb' }
  ];

  return _.map(platforms, ({ host, img }) => {
    return (
      <div key={host}>
        <input id={host} type="radio" {...input} value={host} />
        <label htmlFor={host}>{host}</label>
      </div>
    );
  });
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
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(SelectHostForm);
