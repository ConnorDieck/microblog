import { ADD_POST, ADD_COMMENT, EDIT_POST, DELETE_COMMENT, DELETE_POST, FETCH_POST } from "./types";
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

export const addPost = post => {
	return {
		type    : ADD_POST,
		payload : post
	};
};

// Send updated post to the API and add it to state
export function updatePostInAPI(post) {
	return async function(dispatch) {
		let res = await axios.post(`${BASE_URL}/${post.id}`, post);
		console.log(res.data);
		return dispatch(editPost(res.data));
	};
}

export const editPost = post => {
	return {
		type    : EDIT_POST,
		payload : post
	};
};

export const deletePost = id => {
	return {
		type    : DELETE_POST,
		payload : id
	};
};

export const addComment = (id, comment) => {
	return {
		type    : ADD_COMMENT,
		payload : { id, comment }
	};
};

export const deleteComment = (postId, commentId) => {
	return {
		type    : DELETE_COMMENT,
		payload : { postId, commentId }
	};
};
