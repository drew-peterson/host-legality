import React from 'react';
import styled from 'styled-components';
import { rem } from './rem';
import { media } from './media';

const H1 = props => {
  return <Header1 {...props}>{props.children}</Header1>;
};

const Header1 = styled.h1`
  color: #666;
  font-size: ${rem(24)}
  font-weight: bold;
  text-align: center;

  ${media.tablet`
    fontSize: ${rem(48)}
  `}
`;

export { H1 };
