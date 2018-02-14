import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PropertyList from '../components/property/PropertyList';

class PropertyListContainer extends Component {
  componentDidMount() {
    const { fetchMyProperties } = this.props;
    fetchMyProperties();
  }

  render() {
    const { properties } = this.props;
    return <PropertyList properties={properties} />;
  }
}

function mapStateToProps({ properties }) {
  return { properties };
}
export default connect(mapStateToProps, actions)(PropertyListContainer);
