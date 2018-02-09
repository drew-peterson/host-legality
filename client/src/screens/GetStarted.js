import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
// import _ from 'lodash';
import * as actions from '../actions';
// import styled from 'styled-components';

import { Container, H1, rem } from '../components/common';
import { Row, Col } from 'react-flexbox-grid';
import GoogleAutocomplete from '../utils/GoogleAutocomplete';

import AddProperty from '../components/get_started/AddProperty';

class GetStarted extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.state = {
      page: 1
    };
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }
  onSubmitForm(values) {
    console.log('onSubmitForm', values);
  }
  render() {
    return (
      <Container>
        <H1>Get Started</H1>
        <AddProperty
          previousPage={this.previousPage}
          // onSubmit={this.nextPage}
          onSubmit={this.onSubmitForm}
        />
      </Container>
    );
  }
}

GetStarted = reduxForm({
  form: 'getStarted', // keep name same
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(GetStarted);

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, actions)(GetStarted);
