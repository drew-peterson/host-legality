import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import AuthForm from '../forms/AuthForm';

// configuation and state for signup including form name!
class SignupContainer extends Component {
  onFormSubmit(values) {
    const { history, localSignup } = this.props;
    localSignup(values, history);
  }

  render() {
    return (
      <AuthForm
        onSubmit={this.onFormSubmit.bind(this)}
        form="signup"
        btnText="Signup"
        oAuthType="signup"
      />
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, actions)(withRouter(SignupContainer));
