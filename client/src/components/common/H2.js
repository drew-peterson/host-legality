import React from 'react';
import styled from 'styled-components';
import { rem } from './rem';

const H2 = props => {
  return <Header2 {...props}>{props.children}</Header2>;
};

const Header2 = styled.h1`
  color: #666;
  font-size: ${rem(24)};
`;

export { H2 };
