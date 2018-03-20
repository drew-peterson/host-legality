import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import _ from 'lodash';
import { Button, Input, H2, rem } from '../common';
import HostStep from './HostStep';

// host name
// total steps
// step:
// header
// buttonText
//input:
//type, label name value, placeholder, name

class NewHostForm extends Component {
  state = {
    totalSteps: 1
  };

  renderStep() {
    const { totalSteps } = this.state;
    return _.times(totalSteps, idx => {
      return (
        <InputWrap key={idx}>
          <HostStep step={idx} />
        </InputWrap>
      );
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="hostName" component={Input} label="Host Name" />

        <StepHeader>
          <H2>Steps</H2>
          <button
            type="button"
            onClick={() =>
              this.setState({ totalSteps: this.state.totalSteps + 1 })
            }
          >
            new Step
          </button>
        </StepHeader>
        <StepContainer>{this.renderStep()}</StepContainer>
        <SubmitWrap>
          <Button>Submit</Button>
        </SubmitWrap>
      </form>
    );
  }
}

const StepHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StepContainer = styled.div`
  padding: ${rem(15)};
`;

const SubmitWrap = styled.div`
  margin-top: ${rem(65)};
  text-align: center;
`;

const InputWrap = styled.div`
  margin-top: ${rem(15)};
  border: 1px solid red;
`;

export default reduxForm({
  form: 'NewHost'
})(NewHostForm);
