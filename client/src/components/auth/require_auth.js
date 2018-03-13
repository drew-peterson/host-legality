import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent, requireAdmin = false) {
  class Authentication extends Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.auth) {
        localStorage.setItem('from', nextProps.location.pathname);
        nextProps.history.push('/login');
        return;
      }

      if (requireAdmin && !nextProps.admin) {
        localStorage.setItem('from', nextProps.location.pathname);
        nextProps.history.push('/login');
        return;
      }
    }

    render() {
      const { auth } = this.props; // prevent all loading of resource until authed!
      return auth && <ComposedComponent {...this.props} />;
    }
  }
  function mapStateToProps({ auth }) {
    return { auth, admin: auth ? auth.admin : false };
  }
  return connect(mapStateToProps)(Authentication); // connect Authentication to state...
}
