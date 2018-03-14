import React, { Component } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import _ from 'lodash';
import HostInput from './HostInput';
import { Input } from '../common';

class HostStep extends Component {
  state = {
    totalInputs: 1
  };

  renderInputs() {
    const { totalInputs } = this.state;
    const { step } = this.props;

    return _.times(totalInputs, idx => {
      return <HostInput key={idx} inputNum={idx} step={step} />;
    });
  }

  render() {
    const { step } = this.props;
    return (
      <div>
        <Field component={Input} name={`${step}-header`} label="header" />
        <Field
          component={Input}
          name={`${step}-buttonText`}
          label="buttonText"
        />

        <InputHeader>
          <h2>inputs:</h2>
          <button
            type="button"
            onClick={() =>
              this.setState({ totalInputs: this.state.totalInputs + 1 })
            }
          >
            new input
          </button>
        </InputHeader>
        {this.renderInputs()}
      </div>
    );
  }
}

const InputHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default HostStep;
