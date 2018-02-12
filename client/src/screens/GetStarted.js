import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
// import _ from 'lodash';
import * as actions from '../actions';
// import styled from 'styled-components';

import { Container } from '../components/common';
// import { Row, Col } from 'react-flexbox-grid';

import AddProperty from '../components/get_started/AddProperty';
import ChoosePlateform from '../components/get_started/ChoosePlateform';
import SignupGetStarted from '../components/get_started/SignupGetStarted';

class GetStarted extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.renderPage = this.renderPage.bind(this);
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
    const { history, localSignup } = this.props;
    console.log('onSubmitForm', values);
    //   localSignup(values, history);
    //
    //   // const { from } = this.props.location.state || { from: { pathname: '/' } };
    //   // localSignup(values, history, from);
  }

  renderPage() {
    const { page } = this.state;
    switch (page) {
      case 1:
        return <AddProperty onSubmit={this.nextPage} />;
      case 2:
        return (
          <ChoosePlateform
            // previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        );
      case 3:
        return (
          <SignupGetStarted
            // previousPage={this.previousPage}
            onSubmit={this.onSubmitForm}
          />
        );
      default:
    }
  }

  render() {
    return <Container>{this.renderPage()}</Container>;
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
