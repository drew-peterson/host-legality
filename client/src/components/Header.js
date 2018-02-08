import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <a key="1" href="/login">
            Sign in
          </a>,
          <GetStartedBtn key="2" href="/signup">
            Get started
          </GetStartedBtn>
        ];
      default:
        return [
          <Link to="/protected" key="1">
            Protected
          </Link>,

          <a href="/api/logout" key="2">
            logout
          </a>
        ];
    }
  }
  render() {
    return (
      <NavBar>
        <Link className="left brand-logo" to={this.props.auth ? '/' : '/'}>
          Host Legality
        </Link>
        <LinkContainer>{this.renderContent()}</LinkContainer>
      </NavBar>
    );
  }
}

const NavBar = styled.nav`
  display: flex;
  height: 65px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  padding: 0 20px;
`;

const LinkContainer = styled.ul`
  display: flex;
  align-items: center;
`;

const GetStartedBtn = styled.a`
  display: inline-block;
  width: 174px;
  height: 42px;
  background-color: #2ecc71;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  line-height: 42px;
  text-align: center;
  text-decoration: none;
  border-radius: 42px;
  margin-left: 20px;
`;

const mapStateToProps = ({ auth }) => {
  return { auth };
};
export default connect(mapStateToProps)(Header);
