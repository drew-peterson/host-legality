import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { rem } from '../common';

const PropertyList = props => {
  const { properties } = props;
  if (properties) {
    return _.map(properties, property => {
      return (
        <PropertyItem key={property._id}>
          <Link
            style={styles.propertyItemLink}
            to={`/paymentPlan/${property._id}`}
          >
            <PropertyWrap>
              <PropertyAddress>{property.address}</PropertyAddress>
              <PropertyStatus>{property.status}</PropertyStatus>
            </PropertyWrap>
          </Link>
        </PropertyItem>
      );
    });
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
