import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Container } from '../components/common';

import AddProperty from '../components/property/AddProperty';
import ChoosePlateform from '../components/property/ChoosePlateform';

class NewProperty extends Component {
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
    console.log('onSubmitForm', values);
  }

  renderPage() {
    const { page } = this.state;
    switch (page) {
      case 1:
        return <AddProperty onSubmit={this.nextPage} />;
      case 2:
        return <ChoosePlateform onSubmit={this.onSubmitForm} />;
      default:
        return <AddProperty onSubmit={this.nextPage} />;
    }
  }

  render() {
    return <Container>{this.renderPage()}</Container>;
  }
}

export default reduxForm({
  form: 'NewProperty',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(NewProperty);
