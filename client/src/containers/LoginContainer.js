import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import AuthForm from '../forms/AuthForm';

// configuation and state for loginForm including form name!

class LoginContainer extends Component {
  componentWillUpdate(nextProps) {
    // optional redirect if they went to a protected route without logging in
    // from is set in require_auth
    // get auth when app boots up first time or refresh...
    const { auth, history } = nextProps;
    const from = localStorage.getItem('from') || '/dashboard';
    if (auth) {
      history.push(from);
      localStorage.removeItem('from');
    }
  }

  onFormSubmit(values) {
    const { history, localLogin } = this.props;
    localLogin(values, history);
  }

  render() {
    return (
      <AuthForm
        onSubmit={this.onFormSubmit.bind(this)}
        form="login"
        btnText="Login"
        oAuthType="login"
      />
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, actions)(withRouter(LoginContainer));
