import React from 'react';
import styled from 'styled-components';

const H1 = props => {
  return <Header1 {...props}>{props.children}</Header1>;
};

const Header1 = styled.h1`
  color: #666;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
`;

export { H1 };
