import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';
import styled from 'styled-components';

import { Container, H1, rem, Button } from '../components/common';
import { Row, Col } from 'react-flexbox-grid';

class Dashboard extends Component {
  renderPropertyList() {
    const properties = [
      {
        address: 'address here',
        status: 'need action'
      },
      {
        address: 'address here',
        status: 'need action'
      },
      {
        address: 'address here',
        status: 'need action'
      },
      {
        address: 'address here',
        status: 'need action'
      }
    ];

    return _.map(properties, (property, idx) => {
      return (
        <Row key={idx}>
          <Col xs={8}>
            <PropertyItem>{property.address}</PropertyItem>
          </Col>
          <Col xs={4}>
            <PropertyStatus>{property.status}</PropertyStatus>
          </Col>
        </Row>
      );
    });
  }
  render() {
    return (
      <Container>
        <H1>My Dashboard</H1>
        <Row middle="xs">
          <Col xs={12}>{this.renderPropertyList()}</Col>
        </Row>

        <Button to="/get-started">Add a new property</Button>
      </Container>
    );
  }
}

const PropertyItem = styled.div`
  font-size: $(rem(24));
  padding: ${rem(30)}
  border: 3px solid #bdbdbd;
  border-radius: ${rem(10)};
`;

const PropertyStatus = styled.span`
  font-weight: bold;
  font-size: ${rem(36)};
  text-align: right;
`;

function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps, actions)(Dashboard);
