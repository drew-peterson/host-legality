import React from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { Col, Row } from 'react-flexbox-grid';
import _ from 'lodash';
import {
  Button,
  H1,
  rem,
  Container,
  H2,
  Subheader
} from '../components/common';

const Landing = props => {
  const renderGrid = () => {
    const gridItems = [
      { img: 'img', title: 'title', subtitle: 'subtitle' },
      { img: 'img', title: 'title', subtitle: 'subtitle' },
      { img: 'img', title: 'title', subtitle: 'subtitle' },
      { img: 'img', title: 'title', subtitle: 'subtitle' }
    ];

    return _.map(gridItems, (item, idx) => {
      return (
        <Col xs={6} md={2} key={idx}>
          <Row center="xs">
            <Col xs={12}>{item.img}</Col>
            <Col xs={12}>{item.title}</Col>
            <Col xs={12}>{item.subtitle}</Col>
          </Row>
        </Col>
      );
    });
  };
  const imgSrc =
    'http://res.freestockphotos.biz/pictures/14/14938-illustration-of-a-yellow-house-pv.png';
  return (
    <Container top="40" bottom="40">
      <Row middle="xs">
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <H1 style={styles.header1}>
                Let us worry about your hosting legality and compliance -- drew
                P
              </H1>
            </Col>
            <Col xs={12}>
              <Subheader>
                Host Legality uses our algorithm to walk you through getting
                compliant with just a few clicks.
              </Subheader>
            </Col>
            <Col xs={12} className="center-xs">
              <Button style={styles.header1Btn} to="/signup">
                Get started
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={0} md={6}>
          <img src={imgSrc} alt="" style={styles.header1Img} />
        </Col>
      </Row>
      <Row center="xs" style={styles.container2}>
        <Col xs={12} md={6}>
          <Row center="xs">
            <Col xs={12}>
              <H2>
                Host Legality uses our algorithm to walk you through getting
                compliant with just a few clicks.
              </H2>
            </Col>
            <Col xs={12}>
              <Subheader>
                You’ll be provided with all of the forms you need to get and
                stay compliant in whichever city you choose.
              </Subheader>
            </Col>
          </Row>
        </Col>
        <Col xs={12} style={styles.gridContainer}>
          <Row around="xs">{renderGrid()}</Row>
        </Col>
      </Row>
    </Container>
  );
};

const styles = {
  header1: {
    textAlign: 'left'
  },
  header1Btn: {
    marginTop: rem(35)
  },
  header1Img: {
    backgroundColor: 'grey',
    width: '100%',
    height: 'auto'
  },
  container2: {
    marginTop: rem(120)
  },
  gridContainer: {
    marginTop: rem(60)
  }
};

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Landing);
