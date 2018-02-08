import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { H1, Button } from '../components/common';
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
        <ButtonContainer>
          <Button style={styles.btnStyle} link href="/auth/facebook">
            Facebook
          </Button>
          <Button style={styles.btnStyle} link href="/auth/google">
            Google
          </Button>
          <Button
            onClick={() => this.setState({ emailPassword: !emailPassword })}
            style={styles.btnStyle}
          >
            Log in with email
          </Button>
        </ButtonContainer>

        {emailPassword && (
          <div>
            <H1>Login</H1>
            <LoginForm />
            <Link to="/forgotPassword">Forgot Password</Link>
          </div>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 15px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const styles = {
  btnStyle: {
    width: '300px',
    marginTop: '10px'
  }
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Login);
