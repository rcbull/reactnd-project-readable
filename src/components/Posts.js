import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import Post from "./Post";
import * as SortActions from "../actions/sort";
import * as Api from "../Api";

class Posts extends Component {
  render() {
    let {
      posts,
      filterPosts,
      postSortVoteScore,
      postSortTimestamp,
      sortPosts
    } = this.props;
    if (filterPosts) {
      posts = filterPosts;
    }

    if (Object.keys(posts).length > 1) {
      // filter deleted itens
      posts = Api.toArray(posts).filter(post => post.deleted === false);

      //sorting posts
      posts = Api.sortArray(Api.toArray(posts), sortPosts);
    }

    return (
      <div>
        <br />
        <h3>All Posts</h3>
        <br />
        <div>
          (Sort By <a onClick={() => postSortVoteScore()}>Votes</a> -{" "}
          <a onClick={() => postSortTimestamp()}>Date</a>)
        </div>
        <br />
        <br />
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
  console.log(state);
  return {
    posts: state.posts,
    sortPosts: state.sort.sortPosts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postSortVoteScore: () => dispatch(SortActions.postSortVoteScore()),
    postSortTimestamp: () => dispatch(SortActions.postSortTimestamp())
  };
};

// export default Categories;
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Posts)
);
