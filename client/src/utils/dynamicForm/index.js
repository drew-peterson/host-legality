import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import {
  H1,
  Subheader,
  Button,
  Input,
  rem,
  RadioInput
} from '../../components/common';
import { reduxForm, Field } from 'redux-form';

class DynamicForm extends Component {
  renderInputs() {
    const { formType, inputs } = this.props;
    switch (formType) {
      case 'text':
        return <p>text here.....</p>;
      case 'radio':
        return <Field name="radio" inputs={inputs} component={RadioInput} />;

      default:
        return _.map(inputs, input => {
          return <Field key={input.name} component={Input} {...input} />;
        });
    }
  }

  render() {
    const { handleSubmit, header, subHeader, buttonText } = this.props;

    return (
      <Wrap>
        <H1>{header}</H1>
        <Subheader>{subHeader}</Subheader>
        <Form onSubmit={handleSubmit}>
          {this.renderInputs()}
          <Button style={styles.btnStyle}>{buttonText}</Button>
        </Form>
      </Wrap>
    );
  }
}

const styles = {
  btnStyle: {
    marginTop: rem(25)
  }
};

const Form = styled.form`
  max-width: ${rem(500)};
  margin: 0 auto;
`;

const Wrap = styled.div`
  text-align: center;
  margin-top: ${rem(40)};
`;

DynamicForm.propTypes = {
  form: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  formType: PropTypes.string.isRequired,
  header: PropTypes.string,
  subHeader: PropTypes.string,
  onSubmit: PropTypes.func,
  inputs: PropTypes.array
};

export default reduxForm({})(DynamicForm);
