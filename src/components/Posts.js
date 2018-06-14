import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import Post from "./Post";
import * as SortActions from "../actions/sort";
import * as Api from "../Api";

class Posts extends Component {
  setStyleByVoteScore = () => {
    if (this.props.sortPosts === "voteScore") return { color: "#FF0000" };
    return { color: "#000000" };
  };

  setStyleByDate = () => {
    if (this.props.sortPosts === "voteScore") return { color: "#000000" };
    return { color: "#FF0000" };
  };

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
      //sorting posts
      posts = Api.sortArray(Api.toArray(posts), sortPosts);
    }

    return (
      <div>
        <br />
        <h3>All Posts</h3>
        <br />
        <div>
          (Sort By{" "}
          <a
            style={this.setStyleByVoteScore()}
            onClick={() => postSortVoteScore()}
          >
            Votes
          </a>{" "}
          -{" "}
          <a style={this.setStyleByDate()} onClick={() => postSortTimestamp()}>
            Date
          </a>)
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

const mapStateToProps = ({ posts, sort }) => ({
  posts: Api.sortArray(Api.toArray(posts), sort.sortPosts),
  sortPosts: sort.sortPosts
});

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
