import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Categories from "./Categories.js";
import * as PostActions from "../actions/posts";
import Posts from "./Posts.js";
import { Grid, Row, Col } from "react-flexbox-grid";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      criteria: localStorage.criteria
    };
  }

  searchPosts = criteria => {
    this.setState({
      criteria
    });
    localStorage.criteria = criteria;
  };

  filter() {
    this.props.getPostsFilter(localStorage.criteria);
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Row center="xs">
              <Col>
                <input
                  type="text"
                  placeholder="Search post by title"
                  value={this.state.criteria}
                  onChange={event => this.searchPosts(event.target.value)}
                />
                <button
                  onClick={() => {
                    this.filter();
                  }}
                >
                  Filter
                </button>
              </Col>
            </Row>
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
  return {
    getPostsFilter: criteria => dispatch(PostActions.getPostsFilter(criteria))
  };
};

// export default Home;
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
