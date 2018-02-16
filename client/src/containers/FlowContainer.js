import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import DynamicForm from '../utils/dynamicForm';

// configuation and state for loginForm including form name!

class FlowContainer extends Component {
  onFormSubmit(values) {
    console.log('values', values);
    // save on property inside format
    // compliance: {
    //   totalSteps: 5, // taken from host.totalSteps, // default...
    //   step: 1, // default value or updated when step complete
    //   "1": {
    //     taxId: 234234234,
    //     ssn: 23423234
    //   }
    // }
  }

  switchForm() {}

  render() {
    const { property, host } = this.props;
    console.log('host', host);
    console.log('state', this.state);
    // return <DynamicForm {...form} onSubmit={this.onFormSubmit} />;
    return <div>form container</div>;
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

export default connect(mapStateToProps, actions)(FlowContainer);
