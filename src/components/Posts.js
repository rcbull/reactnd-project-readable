import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import Post from "./Post";
import * as Api from "../Api";

class Posts extends Component {
  render() {
    let { posts, filterPosts } = this.props;
    if (filterPosts) {
      posts = filterPosts;
    }

    if (Object.keys(posts).length > 1) {
      posts = Api.toArray(posts).filter(post => post.deleted === false);
      posts = Api.sortArray(Api.toArray(posts), "voteScore");
    }

    return (
      <div>
        <br />
        <h3>All Posts</h3>
        {Object.keys(posts).map(key => (
          <Post id={posts[key].id} showAddComment={false} key={posts[key].id} />
        ))}

        <div>
          <div>
            <PostForm />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

// export default Categories;
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Posts)
);
