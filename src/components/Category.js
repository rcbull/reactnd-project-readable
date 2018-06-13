import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Posts from "./Posts";
import * as PostActions from "../actions/posts";
import Categories from "./Categories.js";
import { Grid, Row, Col } from "react-flexbox-grid";

class Category extends Component {
  componentDidMount() {}

  render() {
    const { category } = this.props.match.params;
    const { posts } = this.props;

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
          <Col xs={12}>Category selected: {category}</Col>
        </Row>
        <Row center="xs">
          <Col xs={6}>
            <Posts filterPosts={posts} category={category} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { category } = ownProps.match.params;
  return {
    posts: Object.keys(state.posts).reduce(function(p, c) {
      if (state.posts[c].category === category) p[c] = state.posts[c];
      return p;
    }, {}),
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: category => dispatch(PostActions.getPostsByCategory(category))
  };
};

// export default Category;
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Category)
);
