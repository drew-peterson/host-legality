import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import _ from 'lodash';
// import FontIcon from 'material-ui/FontIcon';
import { Button, rem } from '../common';

const HostingPlateformForm = props => {
  const { handleSubmit, btnText, name } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Field name={name} component={plateformItem} />

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

export default HostingPlateformForm;
