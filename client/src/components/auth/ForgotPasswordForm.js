import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import axios from 'axios';
import { Input, Button } from '../common';

class ForgotPasswordForm extends Component {
  state = {
    errors: null,
    success: null
  };

  async onFormSubmit({ email }) {
    try {
      const res = await axios.post('/auth/forgotPassword', { email });
      console.log('res', res.data);
      this.setState({ success: res.data, errors: null });
    } catch ({ response }) {
      this.setState({ errors: response.data.err });
      console.log('err', response.data);
    }
  }

  render() {
    const { handleSubmit, invalid, pristine, submitting } = this.props;
    const { errors, success } = this.state;
    return (
      <Form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
        <Field
          component={Input}
          type="email"
          name="email"
          label="Email address "
          placeholder="Email"
          required
        />

        <Button
          type="submit"
          name="action"
          disabled={pristine || invalid || submitting}
        >
          Submit
        </Button>

        {errors && (
          <ErrorsText className="red-text center-align">{errors}</ErrorsText>
        )}
        {success && <p>{success}</p>}
      </Form>
    );
  }
}

const Form = styled.form`
  max-width: 60%;
  padding: 20px;
  margin: 0 auto;
  text-align: center;
`;

const ErrorsText = styled.p`
  margin-top: 20px !important;
  font-size: 20px;
`;

export default reduxForm({
  form: 'forgotPassword'
})(ForgotPasswordForm);
