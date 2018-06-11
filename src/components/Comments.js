import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as Api from "../Api";
import { connect } from "react-redux";
import Comment from "./Comment";
import * as SortActions from "../actions/sort";

class Comments extends Component {
  render() {
    const { commentSortVoteScore, commentSortTimestamp, sortComments } = this.props;
    let { comments } = this.props;

    //sorting comments
    if (Object.keys(comments).length > 1) {
      // filter deleted itens
      comments = Api.toArray(comments).filter(comments => comments.deleted === false);

      //sorting comments
      comments = Api.sortArray(Api.toArray(comments), sortComments);
    }

    return comments ? (
      <div>
        <div>
          (Sort By <a onClick={() => commentSortVoteScore()}>Votes</a> -{" "}
          <a onClick={() => commentSortTimestamp()}>Date</a>)
        </div>
        <br />
        <br />
        {Object.keys(comments).map(key => (
          <Comment id={comments[key].id} key={comments[key].id} />
        ))}
      </div>
    ) : (
      <div>No comments</div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const comments = Api.toArray(state.comments).filter(
    comment => comment.parentId === ownProps.parentId
  );
  return {
    comments,
    parentId: ownProps.parentId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    commentSortVoteScore: () => dispatch(SortActions.commentSortVoteScore()),
    commentSortTimestamp: () => dispatch(SortActions.commentSortTimestamp())
  };
};

// export default Comments;
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Comments)
);
