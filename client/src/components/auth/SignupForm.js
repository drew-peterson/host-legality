import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
// import { Row, Col } from 'react-flexbox-grid'; // there is a Grid property...
import { Input, Button, rem } from '../common';
import * as actions from '../../actions';

class SignupForm extends Component {
  onFormSubmit(values) {
    const { history, localSignup } = this.props;
    localSignup(values, history);

    // const { from } = this.props.location.state || { from: { pathname: '/' } };
    // localSignup(values, history, from);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
        <Field
          component={Input}
          name="firstName"
          placeholder="enter your first name"
          label="First name"
          required
        />
        <Field
          component={Input}
          name="lastName"
          placeholder="enter your last name"
          label="Last name"
          required
        />
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
  form: 'signupForm'
})(SignupForm);

export default connect(null, actions)(withRouter(SignupForm));
