import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import SignupForm from '../components/auth/SignupForm';
import { Button, H1, rem } from '../components/common';

class Signup extends Component {
  state = {
    showEmail: false
  };
  render() {
    const { showEmail } = this.state;
    return (
      <Container>
        <H1>Get Started!</H1>
        <Row center="xs">
          <Col xs={12} md={4}>
            {/* <Button
              style={styles.btnStyle}
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
              // style={styles.btnStyle}
              onClick={() => this.setState({ showEmail: !showEmail })}
            >
              Sign in with email
            </Button>
          </Col>
        </Row>

        {showEmail && (
          <Row center="xs">
            <Col xs={12} md={4}>
              <SignupForm />
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 15px;
  text-align: center;
`;

const styles = {
  btnStyle: {
    marginTop: rem(15),
    width: '100%'
  }
};

export default Signup;
