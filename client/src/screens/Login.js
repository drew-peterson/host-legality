import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import { H1, Button, rem } from '../components/common';
import LoginForm from '../components/auth/LoginForm';

class Login extends Component {
  state = {
    emailPassword: false
  };
  componentWillUpdate(nextProps) {
    // optional redirect if they went to a protected route without logging in
    // from is set in require_auth
    // get auth when app boots up first time or refresh...
    const { auth, history } = nextProps;
    const from = localStorage.getItem('from') || '/';
    if (auth) {
      history.push(from);
      localStorage.removeItem('from');
    }
  }

  render() {
    const { emailPassword } = this.state;
    return (
      <Container>
        <H1>Welcome back!</H1>
        <Row center="xs">
          <Col xs={12} md={4}>
            <Button
              style={styles.btnStyle}
              link
              href="/auth/facebook"
              backgroundColor="#264187"
            >
              Facebook
            </Button>
            <Button
              style={styles.btnStyle}
              link
              href="/auth/google"
              color="black"
              backgroundColor="white"
            >
              Google
            </Button>
            <Button
              onClick={() => this.setState({ emailPassword: !emailPassword })}
              style={styles.btnStyle}
            >
              Log in with email
            </Button>
          </Col>
        </Row>

        {emailPassword && (
          <Row center="xs">
            <Col xs={12} md={4}>
              <LoginForm />
            </Col>
            <Col xs={12}>
              <Link to="/forgotPassword">Forgot Password</Link>
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
    width: '100%',
    marginTop: rem(15)
  }
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Login);
