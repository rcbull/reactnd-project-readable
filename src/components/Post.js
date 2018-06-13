import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import * as Api from "../Api";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-flexbox-grid";
import Timestamp from "react-timestamp";
import * as PostActions from "../actions/posts";
import * as CommentActions from "../actions/comments";
import Comments from "../components/Comments";
import CommentForm from "./CommentForm";
import PostForm from "./PostForm";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

class Post extends Component {
  componentDidMount() {
    this.props.getPostComments(this.props.id);
  }

  addComment(show, p) {
    return show ? <CommentForm parentId={p.id} edit={false} /> : <div />;
  }

  showComments(comments, show, parentId) {
    return comments && show ? (
      <Grid fluid>
        <Comments parentId={parentId} key={parentId}/>
      </Grid>
    ) : (
      <div />
    );
  }

  render() {
    const {
      id,
      posts,
      post,
      comments,
      upVote,
      downVote,
      deletePost,
      showAddComment
    } = this.props;

    console.log("post", this.props, showAddComment);
    let p = Object.keys(posts)
      .map(key => posts[key])
      .find(b => b.id === id);

    //id deleted, dont show post
    if (p && p.deleted === true) {
      p = null;
    }

    if (post.voteScore) {
      Object.assign(p, post);
    }

    let show = false;
    if (showAddComment === undefined) {
      show = true;
    } else {
      show = showAddComment;
    }

    return p ? (
      <div>
        <Grid fluid>
          <Row center="xs">
            <Col xs={12}>
              <Row center="xs">
                <Col xs={12}>
                  <b>Title: </b>
                  <Link
                    to={"/" + p.category + "/" + p.id}
                    params={{ postId: p.id }}
                  >
                    {p.title}
                  </Link>
                </Col>
              </Row>
              <Row center="xs">
                <Col xs={12}>
                  At: <Timestamp time={p.timestamp / 1000} /> - Author:{" "}
                  {p.author}
                </Col>
              </Row>
              <Row center="xs">
                <Col xs={12}>{p.body}</Col>
              </Row>
              <Row center="xs">
                <Col xs={12}>
                  <b>Category: </b> {p.category}
                </Col>
              </Row>
              <Row center="xs">
                <Col xs={4}>
                  Comments: {Object.keys(comments).length}
                  <div>
                    <PostForm post={p} edit={true} />
                  </div>
                </Col>
                <Col xs={4}>
                  Votes: {p.voteScore}
                  <div onClick={() => upVote(p)}>+</div>
                  <div onClick={() => downVote(p)}>-</div>
                </Col>
                <Col xs={4}>
                  <Button
                    onClick={() => deletePost(p)}
                    variant="raised"
                    color="primary"
                  >
                    delete
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row center="xs">
            <Col>{this.addComment(show, p)}</Col>
          </Row>
          <Row center="xs">
            <Col>{this.showComments(comments, show, p.id)}</Col>
          </Row>
        </Grid>
        <Divider />
      </div>
    ) : (
      <div>No post</div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let postId = ownProps.match.params.id;
  if (ownProps.id) {
    postId = ownProps.id;
  }

  return {
    posts: state.posts,
    postId: postId,
    id: postId,
    post: { ...state.posts[ownProps.match.params.id] },
    // comments: state.comments
    comments: Api.toArray(state.comments).filter(
      comment => comment.parentId === postId && comment.deleted === false
    )
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPostComments: postId =>
      dispatch(CommentActions.getPostComments(ownProps.id)),
    getPost: post => dispatch(PostActions.getPost(ownProps.id)),
    upVote: post => dispatch(PostActions.upVote(post)),
    downVote: post => dispatch(PostActions.downVote(post)),
    deletePost: post => {
      dispatch(PostActions.deletePost(post));
    }
  };
};

// export default Post;
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)
);
