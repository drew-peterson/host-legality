import React from 'react';
import styled from 'styled-components';
import { rem } from './rem';

const Subheader = props => {
  return <SubheaderText {...props}>{props.children}</SubheaderText>;
};

const SubheaderText = styled.h3`
  color: #666;
  font-size: ${rem(24)};
  margin-top: ${rem(15)};
  font-weight: normal;
`;

export { Subheader };
