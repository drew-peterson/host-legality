import React from 'react';
import _ from 'lodash';
import { rem } from './rem';
import { RadioButtonGroup, RadioButton } from 'material-ui/RadioButton';

const RadioInput = props => {
  const { inputs, input } = props;
  return (
    <RadioButtonGroup name="radio">
      {_.map(inputs, data => {
        return (
          <RadioButton
            key={data.value}
            {...input}
            label={data.label}
            value={data.value}
            labelStyle={styles.labelStyle}
          />
        );
      })}
    </RadioButtonGroup>
  );
};

const styles = {
  labelStyle: {
    textAlign: 'left',
    marginLeft: rem(15),
    lineHeight: rem(24)
  }
};

export { RadioInput };
