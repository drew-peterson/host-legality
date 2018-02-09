import React from 'react';
import styled from 'styled-components';
import { rem, darken } from 'polished';
import { Link } from 'react-router-dom';

const Button = props => {
  const { children, to, href } = props;
  if (to) {
    return (
      <Link {...props} style={{ textDecoration: 'none' }}>
        <LinkTag>{children}</LinkTag>
      </Link>
    );
  } else if (href) {
    return (
      <a {...props} style={{ textDecoration: 'none' }}>
        <LinkTag>{children}</LinkTag>
      </a>
    );
  }
  return <Btn {...props}>{children}</Btn>;
};

const Btn = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  border-radius: ${rem(66)};
  box-shadow: inset 0 0 0 0.4rem
      ${props => darken(0.04, props.backgroundColor || props.theme.green)},
    0 0.4rem 0 0 #e7e6e4;
  background-color: ${props => props.backgroundColor || props.theme.green};
  color: ${props => props.color || '#fff'};
  transition: all 0.2s cubic-bezier(0.06, 0.67, 0.37, 0.99);
  font-weight: 500;
  border: ${rem(3)} solid #30466c;
  height: ${rem(66)};
  padding: 0 ${rem(32)};
  font-size: ${rem(25)};
  outline: none;
  vertical-align: top;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0 0 0 0.4rem
        ${props => darken(0.06, props.backgroundColor || props.theme.green)},
      0 0.4rem 0 0 #e7e6e4;
    transform: translateY(-0.2rem);
  }
`;
const LinkTag = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  border-radius: ${rem(66)};
  box-shadow: inset 0 0 0 0.4rem
      ${props => darken(0.04, props.backgroundColor || props.theme.green)},
    0 0.4rem 0 0 #e7e6e4;
  background-color: ${props => props.backgroundColor || props.theme.green};
  color: ${props => props.color || '#fff'};
  transition: all 0.2s cubic-bezier(0.06, 0.67, 0.37, 0.99);
  font-weight: 500;
  border: ${rem(3)} solid #30466c;
  height: ${rem(66)};
  padding: 0 ${rem(32)};
  font-size: ${rem(25)};
  outline: none;
  vertical-align: top;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0 0 0 0.4rem
        ${props => darken(0.06, props.backgroundColor || props.theme.green)},
      0 0.4rem 0 0 #e7e6e4;
    transform: translateY(-0.2rem);
  }
`;

export { Button };
