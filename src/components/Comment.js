import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-flexbox-grid";
import Timestamp from "react-timestamp";
import * as CommentActions from "../actions/comments";
import CommentForm from "../components/CommentForm";
import Button from "@material-ui/core/Button";

class Comment extends Component {
  render() {
    const {
      id,
      comments,
      comment,
      upVote,
      downVote,
      deleteComment
    } = this.props;

    let c = Object.keys(comments)
      .map(key => comments[key])
      .find(b => b.id === id);

    if (comment.voteScore) {
      Object.assign(c, comment);
    }

    return c ? (
      <div>
        <Grid fluid>
          <Row center="xs">
            <Col xs={12}>
              <Timestamp time={c.timestamp / 1000} /> - {c.author}
            </Col>
          </Row>
          <Row center="xs">
            <Col xs={12}>
              {c.body}
              <CommentForm comment={c} parentId={c.parentId} edit={true} />
            </Col>
          </Row>
          <Row center="xs">
            <Col xs={12}>
              Votes: {c.voteScore}
              <br />
              <div onClick={() => upVote(c)}>+</div>
              <div onClick={() => downVote(c)}>-</div>
            </Col>
          </Row>
          <Row center="xs">
            <Col xs={12}>
              <Button
                onClick={() => deleteComment(c)}
                variant="raised"
                color="primary"
              >
                delete
              </Button>
            </Col>
          </Row>
        </Grid>
      </div>
    ) : (
      <div>No comment</div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    comments: state.comments,
    comment: { ...state.comments[ownProps.match.params.id] },
    parentId: ownProps.match.params.parentId
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    upVote: comment => dispatch(CommentActions.upVote(comment)),
    downVote: comment => dispatch(CommentActions.downVote(comment)),
    deleteComment: comment => dispatch(CommentActions.deleteComment(comment))
  };
};

// export default Comment;
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Comment)
);
