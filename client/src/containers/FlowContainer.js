import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { flowSubmitStep } from '../actions';
import DynamicForm from '../utils/dynamicForm';
import host from '../utils/dynamicForm/form.json';
import CompleteFlowStep from '../utils/dynamicForm/CompleteFlowStep';

// configuation and state for loginForm including form name!

class FlowContainer extends Component {
  state = {
    stepFormData: null,
    complete: false
  };

  onFormSubmit(values) {
    const { flowSubmitStep, property } = this.props;
    const { compliance: { step } } = property;
    flowSubmitStep({ values, step, propertyID: property._id });
  }

  afterSubmit(results, dispatch) {
    // reset form so our wizard form does not keep track of old values...
    dispatch(reset('propertyFlowForm'));
  }

  switchForm() {
    const { property, flowStepData } = this.props;
    if (property) {
      const { compliance } = property;
      console.log('complete??', compliance.step, compliance.totalSteps);
      if (compliance.step > compliance.totalSteps) {
        return <CompleteFlowStep />;
      }
      return (
        <DynamicForm
          {...flowStepData}
          onSubmit={this.onFormSubmit.bind(this)}
          onSubmitSuccess={this.afterSubmit.bind(this)}
          form="propertyFlowForm"
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
  const { steps } = host;
  if (properties) {
    const property = properties[params.propertyId];
    const { compliance: { step } } = property;
    return {
      property: property,
      flowStepData: steps[step]
    };
  }
  return {};
};

export default connect(mapStateToProps, { flowSubmitStep })(FlowContainer);
