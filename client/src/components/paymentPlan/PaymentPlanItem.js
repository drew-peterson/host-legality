import React from 'react';
import { Button, rem, media } from '../common';
import { change } from 'redux-form';
import styled from 'styled-components';

const PaymentPlanItem = props => {
  const { type, amount, description, handleSubmit, id } = props;
  const handleClick = () => {
    // best way to handle onChange submit for radio button...
    props.meta.dispatch(change('paymentPlan', 'plan', id));
    handleSubmit();
  };
  return (
    <Card amount={amount}>
      {amount === 25 && <SelectTag>Most Popular</SelectTag>}
      <Type>{type}</Type>
      <Amount>${amount}</Amount>
      <Subtitle>per month</Subtitle>
      <Description>{description}</Description>

      {handleSubmit && (
        <BtnWrap>
          <Button type="button" onClick={handleClick}>
            Continue
          </Button>
        </BtnWrap>
      )}
    </Card>
  );
};

// height: ${rem(507)};
const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: ${rem(15)};
  padding: ${rem(25)};
  ${media.tablet`
    max-width: ${rem(350)};
  `} color: #666666;
  border: ${props =>
    props.amount === 25 ? 'solid 3px #2ecc71' : 'solid 1px #666666'};
`;
const Type = styled.span`
  font-size: ${rem(36)};
  font-weight: bold;
  align-self: flex-start;
`;
const Amount = styled.h2`
  font-size: ${rem(72)};
  margin-top: ${rem(15)};
  font-weight: bold;
`;
const Subtitle = styled.h3`
  font-size: ${rem(24)};
  font-weight: bold;
  margin-top: ${rem(5)};
`;
const Description = styled.p`
  font-size: ${rem(18)};
  max-width: ${rem(255)};
  margin-top: ${rem(25)};
`;
const BtnWrap = styled.div`
  margin-top: ${rem(100)};
`;
const SelectTag = styled.div`
  position: absolute;
  height: ${rem(40)};
  top: ${rem(-40)};
  background-color: #2ecc71;
  color: white;
  font-size: ${rem(32)};
  font-weight: bold;
  text-align: center;
  line-height: ${rem(40)};
  padding: 0 ${rem(10)};
  border-top-right-radius: ${rem(10)};
  border-top-left-radius: ${rem(10)};
`;

export default PaymentPlanItem;
