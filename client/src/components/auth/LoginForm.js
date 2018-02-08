import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions';
import { Input, Button, rem } from '../common';

class LoginForm extends Component {
  async onFormSubmit(values) {
    const { history, localLogin } = this.props;
    localLogin(values, history);
  }

  render() {
    const { handleSubmit, errors } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
        <Field
          component={Input}
          label="Email address"
          type="email"
          name="email"
          placeholder="enter your email address"
        />
        <Field
          component={Input}
          label="Password"
          type="password"
          name="password"
          placeholder="enter your password"
        />
        <Button style={styles.btnStyle} type="submit" name="action">
          Login
        </Button>

        {errors && (
          <ErrorsText className="red-text center-align">
            {errors.localLogin}
          </ErrorsText>
        )}
      </Form>
    );
  }
}

const Form = styled.form`
  margin-top: 40px;
`;

const ErrorsText = styled.p`
  margin-top: 20px !important;
  font-size: 20px;
`;
const styles = {
  btnStyle: {
    marginTop: rem(15),
    width: rem(200)
  }
};

function mapStateToProps({ errors }) {
  return { errors };
}

LoginForm = reduxForm({
  form: 'loginForm'
})(LoginForm);

export default connect(mapStateToProps, actions)(withRouter(LoginForm));
