import React, { Component } from 'react';
// import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import SignupForm from '../auth/SignupForm';
import { Button, H1, rem } from '../common';

class SignupGetStarted extends Component {
  state = {
    showEmail: false
  };
  render() {
    const { showEmail } = this.state;
    return (
      <div>
        <H1>Let’s get your details</H1>
        <Row center="xs">
          <Col xs={12} md={4}>
            {/* <Button
              style={styles.btnStyle}
              link
              href="/auth/facebook"
              backgroundcolor="#264187"
            >
              Facebook
            </Button> */}
            <Button
              style={styles.btnStyle}
              href="/auth/google"
              backgroundcolor="white"
              color="black"
            >
              Google
            </Button>

            <Button
              style={styles.btnStyle}
              onClick={() => this.setState({ showEmail: !showEmail })}
            >
              Sign in with email
            </Button>
          </Col>
        </Row>

        {showEmail && (
          <Row center="xs">
            <Col xs={12} md={4}>
              <SignupForm {...this.props} />
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

const styles = {
  btnStyle: {
    marginTop: rem(15),
    width: '100%'
  }
};

export default SignupGetStarted;
