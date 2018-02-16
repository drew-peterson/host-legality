import React, { Component } from 'react';
import { connect } from 'react-redux';

import { flowSubmitStep } from '../actions';
import DynamicForm from '../utils/dynamicForm';

// configuation and state for loginForm including form name!

class FlowContainer extends Component {
  state = {
    stepFormData: null
  };

  onFormSubmit(values) {
    const { flowSubmitStep, property } = this.props;
    const { compliance: { step } } = property;
    flowSubmitStep({ values, step, property });
  }

  // update form to show current form data for step
  componentWillUpdate(ownProps) {
    const { property, host } = ownProps;
    const { stepFormData } = this.state;
    if (property && !stepFormData) {
      const { compliance } = property;
      this.setState({ stepFormData: host.steps[compliance.step] });
    }
  }

  render() {
    const { stepFormData } = this.state;
    // set dynamic form to current steps data
    if (stepFormData) {
      return (
        <DynamicForm
          {...stepFormData}
          onSubmit={this.onFormSubmit.bind(this)}
        />
      );
    }
    return <div>loading.....</div>;
  }
}

const mapStateToProps = ({ properties }, { params }) => {
  if (properties) {
    let property = properties[params.propertyId];
    property.compliance = {
      totalSteps: 2, // taken from host.totalSteps, // default...
      step: 1, // default value or updated when step complete
      '1': {},
      '2': {}
    };
    return {
      property: property
    };
  }
  return {};
};

export default connect(mapStateToProps, { flowSubmitStep })(FlowContainer);
