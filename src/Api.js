const api_url = "http://localhost:3001";

// let token = 'whatever-you-want'
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
  Authorization: token
};

export const getCategories = () => fetch(`${api_url}/categories`, { headers });

export const getPostsByCategory = categoryId =>
  fetch(`${api_url}/${categoryId}/posts`, { headers });

export const getPost = postId =>
  fetch(`${api_url}/posts/${postId}`, { headers });

export const getPosts = () => fetch(`${api_url}/posts`, { headers });

export const setPostUpVote = postId =>
  fetch(`${api_url}/posts/${postId}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ option: "upVote" })
  });

export const setPostDownVote = postId =>
  fetch(`${api_url}/posts/${postId}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ option: "downVote" })
  });

export const getPostComments = postId =>
  fetch(`${api_url}/posts/${postId}/comments`, { headers });

export const addPost = post =>
  fetch(`${api_url}/posts`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(post)
  });

export const editPost = post =>
  fetch(`${api_url}/posts/${post.id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      body: post.body,
      title: post.title
    })
  });

export const deletePost = post =>
  fetch(`${api_url}/posts/${post.id}`, {
    method: "DELETE",
    headers: headers
  });

export const addComment = comment =>
  fetch(`${api_url}/comments`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(comment)
  });

export const setCommentUpVote = commentId =>
  fetch(`${api_url}/comments/${commentId}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ option: "upVote" })
  });

export const setCommentDownVote = commentId =>
  fetch(`${api_url}/comments/${commentId}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ option: "downVote" })
  });

export const editComment = comment =>
  fetch(`${api_url}/comments/${comment.id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      body: comment.body,
      timestamp: new Date()
    })
  });

export const deleteComment = commentId =>
  fetch(`${api_url}/comments/${commentId}`, {
    method: "DELETE",
    headers: headers
  });

export function toArray(obj) {
  return Object.keys(obj).map(key => obj[key]);
}

export function sortArray(arr, field) {
  return arr.sort((a, b) => a[field] < b[field]);
}

export function arrayToObject(arr, key) {
  return arr.reduce(function(map, obj) {
    map[obj[key]] = obj;
    return map;
  }, {});
}

export function mergeArrays(arrays, prop) {
  const merged = {};

  arrays.forEach(arr => {
    arr.forEach(item => {
      merged[item[prop]] = Object.assign({}, merged[item[prop]], item);
    });
  });

  return Object.values(merged);
}
