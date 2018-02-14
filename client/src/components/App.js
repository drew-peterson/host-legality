import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as actions from '../actions';

import Header from './Header';
import Landing from '../screens/Landing';
import Dashboard from '../screens/Dashboard';
import PaymentPlan from '../screens/PaymentPlan';
import NewProperty from '../screens/NewProperty';

// AUTH
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ResetPassword from '../screens/ResetPassword';
import ForgotPassword from '../screens/ForgotPassword';
import requireAuth from './auth/require_auth';

class App extends Component {
  // preferred location for intial ajax request w/ new react
  // componentDidMount() {
  componentWillMount() {
    this.props.fetchUser(); // check auth...
    this.props.fetchMyProperties();
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/dashboard" component={requireAuth(Dashboard)} />
            <Route
              path="/paymentPlan/:propertyId"
              component={requireAuth(PaymentPlan)}
            />
            <Route path="/addProperty" component={requireAuth(NewProperty)} />
            <Route path="/resetPassword/:token" component={ResetPassword} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

// If no route is found default here...
const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

export default connect(null, actions)(App);
