import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { rem } from '../common';

const PropertyList = props => {
  const { properties } = props;
  const sortOrder = {
    'pending-payment': 1,
    paid: 2,
    complete: 3
  };
  const statusRedirect = {
    'pending-payment': '/paymentPlan',
    paid: '/flow',
    complete: '/complete'
  };
  if (properties) {
    return _.chain(properties)
      .sortBy(p => sortOrder[p.status])
      .map(property => {
        const { status, _id, address } = property;
        return (
          <PropertyItem key={_id} className="propertyItem">
            <Link
              style={styles.propertyItemLink}
              to={`${statusRedirect[status]}/${_id}`}
            >
              <PropertyWrap>
                <PropertyAddress className="address">{address}</PropertyAddress>
                <PropertyStatus className="status">{status}</PropertyStatus>
              </PropertyWrap>
            </Link>
          </PropertyItem>
        );
      })
      .value();
  }

  return <div>loading...</div>;
};

const PropertyItem = styled.div`
  margin-top: ${rem(30)};
`;

const PropertyAddress = styled.div`
  font-size: ${rem(24)};
  padding: ${rem(30)};
  border: 3px solid #bdbdbd;
  border-radius: ${rem(10)};
`;

const PropertyStatus = styled.span`
  font-weight: bold;
  font-size: ${rem(25)};
  text-align: right;
`;

const PropertyWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: 0.2s background-color;

  &:hover {
    background-color: #efefef;
  }
`;

const styles = {
  propertyItemLink: {
    textDecoration: 'none',
    color: '#828282'
  }
};

export default PropertyList;
