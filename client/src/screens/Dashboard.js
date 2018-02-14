import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import * as actions from '../actions';
import styled from 'styled-components';

import { Container, H1, rem, Button } from '../components/common';
// import { Row, Col } from 'react-flexbox-grid';

class Dashboard extends Component {
  componentDidMount() {
    const { fetchMyProperties } = this.props;
    fetchMyProperties();
  }

  renderPropertyList() {
    const { properties } = this.props;
    if (properties) {
      return _.map(properties, property => {
        return (
          <Link
            key={property._id}
            style={styles.propertyItemLink}
            to={`/paymentPlan/${property._id}`}
          >
            <PropertyWrap>
              <PropertyItem>{property.address}</PropertyItem>
              <PropertyStatus>{property.status}</PropertyStatus>
            </PropertyWrap>
          </Link>
        );
      });
    }

    return <div>loading...</div>;
  }
  render() {
    return (
      <Container>
        <H1>My Dashboard</H1>

        <div style={{ marginTop: rem(25) }}>{this.renderPropertyList()}</div>
        <BtnWrap>
          <Button to="/addProperty">Add a new property</Button>
        </BtnWrap>
      </Container>
    );
  }
}

const PropertyItem = styled.div`
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

const BtnWrap = styled.div`
  margin-top: ${rem(25)};
`;

const styles = {
  propertyItemLink: {
    textDecoration: 'none',
    color: '#828282'
  }
};

function mapStateToProps({ properties }) {
  return { properties };
}
export default connect(mapStateToProps, actions)(Dashboard);
