import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Input, Button, rem } from '../common';
import * as actions from '../../actions';

class SignupForm extends Component {
  // onFormSubmit(values) {
  //   const { history, localSignup } = this.props;
  //   localSignup(values, history);
  //
  //   // const { from } = this.props.location.state || { from: { pathname: '/' } };
  //   // localSignup(values, history, from);
  // }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Field
          component={Input}
          type="email"
          name="email"
          placeholder="enter your email address"
          label="Email address"
          required
        />
        <Field
          component={Input}
          type="password"
          name="password"
          placeholder="enter your password"
          label="Password"
          required
        />
        <Button
          style={styles.btnStyle}
          className="btn"
          type="submit"
          name="action"
        >
          Submit
        </Button>
      </Form>
    );
  }
}

const Form = styled.form``;

const styles = {
  btnStyle: {
    marginTop: rem(15),
    width: rem(200)
  }
};

SignupForm = reduxForm({
  form: 'getStarted'
})(SignupForm);

export default connect(null, actions)(SignupForm);
