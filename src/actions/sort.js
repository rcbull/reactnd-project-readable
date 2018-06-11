export const POST_SORT_VOTESCORE = "POST_SORT_VOTESCORE";
export const POST_SORT_TIMESTAMP = "POST_SORT_TIMESTAMP";
export const COMMENT_SORT_VOTESCORE = "COMMENT_SORT_VOTESCORE";
export const COMMENT_SORT_TIMESTAMP = "COMMENT_SORT_TIMESTAMP";

export function commentSortVoteScore() {
  return {
    type: COMMENT_SORT_VOTESCORE
  };
}

export function commentSortTimestamp() {
  return {
    type: COMMENT_SORT_TIMESTAMP
  };
}

export function postSortVoteScore() {
  return {
    type: POST_SORT_VOTESCORE
  };
}

export function postSortTimestamp() {
  return {
    type: POST_SORT_TIMESTAMP
  };
}
