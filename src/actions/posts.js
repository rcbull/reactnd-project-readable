import * as Api from "../Api";

export const POSTS_OPENED = "POSTS_OPENED";
export const POSTS_CATEGORY_OPENED = "POSTS_CATEGORY_OPENED";
export const POST_OPENED = "POST_OPENED";
export const DELETED_SUCCESS = "DELETED_SUCCESS";
export const UPDATE_SUCESSFUL = "UPDATE_SUCESSFUL";
export const SAVE_SUCESSFUL = "SAVE_SUCESSFUL";

export function postsOpened(posts) {
  return {
    type: "POSTS_OPENED",
    posts
  };
}

export function postsCategoryOpened(posts) {
  return {
    type: "POSTS_CATEGORY_OPENED",
    posts
  };
}

export function postOpened(post) {
  return {
    type: POST_OPENED,
    post
  };
}

export function deletedSuccess(post) {
  return {
    type: DELETED_SUCCESS,
    post
  };
}

export function saveSuccess(post) {
  return {
    type: SAVE_SUCESSFUL,
    post
  };
}

export function updateSucessful(post) {
  return {
    type: UPDATE_SUCESSFUL,
    post
  };
}

export function getPosts() {
  return dispatch => {
    Api.getPosts()
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(posts => {
        dispatch(postsOpened(Api.toArray(posts, "id")));
      })
      .catch(error => console.error(error));
  };
}

export function getPost(postId) {
  return dispatch => {
    Api.getPost(postId)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(post => {
        console.log("postActions ", post);
        dispatch(postOpened(Api.toArray(post, "id")));
      })
      .catch(error => console.error(error));
  };
}

export function addPost(post) {
  return dispatch => {
    Api.addPost(post)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(post => {
        dispatch(saveSuccess(post));
      })
      .catch(error => console.error(error));
  };
}

export function editPost(post) {
  return dispatch => {
    Api.editPost(post)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(post => {
        dispatch(updateSucessful(post));
      })
      .catch(error => console.error(error));
  };
}

export function deletePost(post) {
  return dispatch => {
    Api.deletePost(post)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(() => {
        dispatch(deletedSuccess(post));
      })
      .catch(error => console.error(error));
  };
}

export function getPostsByCategory(categoryId) {
  return dispatch => {
    Api.getPostsByCategory(categoryId)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(posts => {
        console.log("posts API", posts);
        dispatch(postsCategoryOpened(Api.toArray(posts, "id")));
      })
      .catch(error => console.error(error));
  };
}

export function upVote(post) {
  return dispatch => {
    Api.setPostUpVote(post.id)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(post => {
        dispatch(updateSucessful(post));
      })
      .catch(error => console.error(error));
  };
}

export function downVote(post) {
  return dispatch => {
    Api.setPostDownVote(post.id)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(post => {
        dispatch(updateSucessful(post));
      })
      .catch(error => console.error(error));
  };
}
