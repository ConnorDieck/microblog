import { ADD_POST, ADD_COMMENT, EDIT_POST, DELETE_COMMENT, DELETE_POST, FETCH_POST, VOTE } from "./types";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api/posts";

// Given an id, loads associated post from backend and adds to state in Redux
export function fetchPostFromAPI(postId) {
	return async function(dispatch) {
		let res = await axios.get(`${BASE_URL}/${postId}`);
		return dispatch(fetchPost(res.data));
	};
}

const fetchPost = post => {
	return {
		type    : FETCH_POST,
		payload : post
	};
};

// Send a newly written post to the API and add it to state
export function sendPostToAPI(post) {
	return async function(dispatch) {
		let res = await axios.post(`${BASE_URL}/`, post);
		return dispatch(addPost(res.data));
	};
}

const addPost = post => {
	return {
		type    : ADD_POST,
		payload : post
	};
};

// Send updated post to the API and add it to state
export function updatePostInAPI(post) {
	return async function(dispatch) {
		let res = await axios.put(`${BASE_URL}/${post.id}`, post);
		return dispatch(editPost(res.data));
	};
}

const editPost = post => {
	return {
		type    : EDIT_POST,
		payload : post
	};
};

// Delete post from API and state
export function deletePostFromAPI(postId) {
	return async function(dispatch) {
		let res = await axios.delete(`${BASE_URL}/${postId}`);
		return dispatch(deletePost(postId));
	};
}

const deletePost = id => {
	return {
		type    : DELETE_POST,
		payload : id
	};
};

// Add a new comment in state and the API
export function sendCommentToAPI(postId, comment) {
	return async function(dispatch) {
		let res = await axios.post(`${BASE_URL}/${postId}/comments`, comment);
		return dispatch(addComment(postId, res.data));
	};
}

const addComment = (id, comment) => {
	return {
		type    : ADD_COMMENT,
		payload : { id, comment }
	};
};

// Delete comment from state and API

export function deleteCommentFromAPI(postId, commentId) {
	return async function(dispatch) {
		let res = await axios.delete(`${BASE_URL}/${postId}/comments/${commentId}`);
		return dispatch(deleteComment(postId, commentId));
	};
}

const deleteComment = (postId, commentId) => {
	return {
		type    : DELETE_COMMENT,
		payload : { postId, commentId }
	};
};

// Send up or down-votes to the API and store in state

export function sendVoteToAPI(postId, direction) {
	return async function(dispatch) {
		let res = await axios.post(`${BASE_URL}/${postId}/vote/${direction}`);
		return dispatch(vote(postId, res.data.votes));
	};
}

const vote = (postId, votes) => {
	return {
		type    : VOTE,
		payload : { postId, votes }
	};
};
