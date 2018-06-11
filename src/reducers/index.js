import { combineReducers } from "redux";
import * as CategoryActions from "../actions/categories";
import * as PostActions from "../actions/posts";
import * as CommentsActions from "../actions/comments";

function categories(state = {}, action) {
  switch (action.type) {
    case CategoryActions.CATEGORIES_OPENED:
      return action.categories;
    default:
      return state;
  }
}

function posts(state = {}, action) {
  switch (action.type) {
    case PostActions.POSTS_OPENED:
      return action.posts;
    case PostActions.DELETED_SUCCESS:
      action.post.deleted = true;
      Object.assign(
        Object.keys(state)
          .map(key => state[key])
          .find(b => b.id === action.post.id),
        action.post
      );
      return {
        ...state
      };
    case PostActions.POST_OPENED:
      return {
        ...state,
        [action.post.id]: {
          ...state[action.post.id],
          voteScore: action.post.voteScore,
          body: action.post.body,
          title: action.post.title
        }
      };
    case PostActions.UPDATE_SUCESSFUL:
      Object.assign(
        Object.keys(state)
          .map(key => state[key])
          .find(b => b.id === action.post.id),
        action.post
      );
      return {
        ...state
      };
    case PostActions.SAVE_SUCESSFUL:
      return {
        ...state,
        [action.post.id]: action.post
      };
    default:
      return state;
  }
}

function comments(state = {}, action) {
  switch (action.type) {
    case CommentsActions.COMMENTS_OPENED:
      return {
        ...state,
        ...action.comments
      };
    case CommentsActions.COMMENT_SAVE_SUCESSFUL:
      return {
        ...state,
        [action.comment.id]: action.comment
      };
    case CommentsActions.COMMENT_DELETED_SUCCESS:
      action.comment.deleted = true;
      Object.assign(
        Object.keys(state)
          .map(key => state[key])
          .find(b => b.id === action.comment.id),
        action.comment
      );
      return {
        ...state
      };
    case CommentsActions.COMMENT_UPDATE_SUCESSFUL:
      Object.assign(
        Object.keys(state)
          .map(key => state[key])
          .find(b => b.id === action.comment.id),
        action.comment
      );
      return {
        ...state
      };

    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
  comments
});
