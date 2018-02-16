import React, { Component } from 'react';
import { connect } from 'react-redux';

import { flowSubmitStep } from '../actions';
import DynamicForm from '../utils/dynamicForm';

// configuation and state for loginForm including form name!

class FlowContainer extends Component {
  state = {
    stepFormData: null,
    complete: false
  };

  onFormSubmit(values) {
    const { flowSubmitStep, property } = this.props;
    const { compliance: { step } } = property;
    flowSubmitStep({ values, step, property });
  }

  switchForm() {
    const { property, host } = this.props;
    if (property) {
      const { compliance } = property;
      const flowStepData = host.steps[compliance.step];
      if (compliance.step > compliance.totalSteps) {
        return <div>Complete....</div>;
      }
      return (
        <DynamicForm
          {...flowStepData}
          onSubmit={this.onFormSubmit.bind(this)}
        />
      );
    }
    return <div>loading.....</div>;
  }

  render() {
    return this.switchForm();
  }
}

const mapStateToProps = ({ properties }, { params }) => {
  if (properties) {
    return {
      property: properties[params.propertyId]
    };
  }
  return {};
};

export default connect(mapStateToProps, { flowSubmitStep })(FlowContainer);
