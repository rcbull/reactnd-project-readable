import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as Api from "../Api";
import { connect } from "react-redux";
import Comment from "./Comment";

class Comments extends Component {
  render() {
    const { comments } = this.props;
    return comments ? (
      <div>
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
  return {};
};

// export default Comments;
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Comments)
);
