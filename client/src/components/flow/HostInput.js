import React from 'react';
import { Field } from 'redux-form';
import { Input } from '../common';

export default ({ inputNum, step }) => {
  return (
    <div>
      <Field component={Input} name={`${step}-type-${inputNum}`} label="Type" />
      <Field component={Input} name={`${step}-name-${inputNum}`} label="Name" />
      <Field
        component={Input}
        name={`${step}-value-${inputNum}`}
        label="Value"
      />
      <Field
        component={Input}
        name={`${step}-placeholder-${inputNum}`}
        label="Placeholder"
      />
    </div>
  );
};
