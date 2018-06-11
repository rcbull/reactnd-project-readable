import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Categories from "./Categories.js";
import Posts from "./Posts.js";
import { Grid, Row, Col } from "react-flexbox-grid";

class Home extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Row center="xs">
              <Col xs={6}>
                <Categories />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Row center="xs">
              <Col xs={6}>
                <Posts />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {};
};

// export default Home;
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
