import React from 'react';
import styled from 'styled-components';
import { rem } from './rem';
import { media } from './media';

const Container = props => {
  return <ContainerWrap {...props}>{props.children}</ContainerWrap>;
};

const I = 15;

const renderProps = ({ top = I, bottom = I, left = I, right = I }) => {
  return `${rem(top)} ${rem(right)} ${rem(bottom)} ${rem(left)}`;
};

const renderXsProps = ({
  xsTop = I,
  xsBottom = I,
  xsLeft = I,
  xsRight = I
}) => {
  return `${rem(xsTop)} ${rem(xsRight)} ${rem(xsBottom)} ${rem(xsLeft)}`;
};

const ContainerWrap = styled.div`
  padding: ${props => renderXsProps};
  ${media.tablet`
    padding: ${props => renderProps};
  `};
`;

export { Container };
