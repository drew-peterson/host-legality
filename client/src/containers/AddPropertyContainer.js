import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import AddPropertyForm from '../forms/AddPropertyForm';

// configuation and state for loginForm including form name!

class AddPropertyContainer extends Component {
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
    const { saveProperty, history } = this.props;
    saveProperty(values, history);
  }

  render() {
    const { page } = this.state;
    return (
      <AddPropertyForm
        page={page}
        nextPage={this.nextPage}
        previousPage={this.previousPage}
        onSubmitForm={this.onSubmitForm}
      />
    );
  }
}

export default connect(null, actions)(withRouter(AddPropertyContainer));
