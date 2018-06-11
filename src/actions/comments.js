import * as Api from "../Api";

export const COMMENTS_OPENED = "COMMENTS_OPENED";
export const COMMENT_UPDATE_SUCESSFUL = "COMMENT_UPDATE_SUCESSFUL";
export const COMMENT_SAVE_SUCESSFUL = "COMMENT_SAVE_SUCESSFUL";
export const COMMENT_DELETED_SUCCESS = "COMMENT_DELETED_SUCCESS";

export function commentsOpened(comments) {
  return {
    type: "COMMENTS_OPENED",
    comments
  };
}

export function deletedCommentSuccess(comment) {
  return {
    type: COMMENT_DELETED_SUCCESS,
    comment
  };
}

export function commentSaveSuccess(comment) {
  return {
    type: COMMENT_SAVE_SUCESSFUL,
    comment
  };
}

export function commentUpdateSucessful(comment) {
  return {
    type: COMMENT_UPDATE_SUCESSFUL,
    comment
  };
}

export function getPostComments(postId) {
  return dispatch => {
    Api.getPostComments(postId)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(comments => {
        dispatch(commentsOpened(Api.toArray(comments, "id")));
      })
      .catch(error => console.error(error));
  };
}

export function deleteComment(comment) {
  return dispatch => {
    Api.deleteComment(comment.id)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(comment => {
        dispatch(deletedCommentSuccess(comment));
      })
      .catch(error => console.error(error));
  };
}

export function addComment(comment) {
  return dispatch => {
    Api.addComment(comment)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(comment => {
        dispatch(commentSaveSuccess(comment));
      })
      .catch(error => console.error(error));
  };
}

export function editComment(comment) {
  return dispatch => {
    Api.editComment(comment)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(comment => {
        dispatch(commentUpdateSucessful(comment));
      })
      .catch(error => console.error(error));
  };
}

export function upVote(comment) {
  return dispatch => {
    Api.setCommentUpVote(comment.id)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(comment => {
        dispatch(commentUpdateSucessful(comment));
      })
      .catch(error => console.error(error));
  };
}

export function downVote(comment) {
  return dispatch => {
    Api.setCommentDownVote(comment.id)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(comment => {
        dispatch(commentUpdateSucessful(comment));
      })
      .catch(error => console.error(error));
  };
}
