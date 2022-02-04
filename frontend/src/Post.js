import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentFromAPI, deletePostFromAPI } from "./actions/posts";
import { fetchPostFromAPI } from "./actions/posts";

import PostView from "./PostView";
import CommentList from "./CommentList";
import NewCommentForm from "./NewCommentForm";

const Post = () => {
	const postId = Number(useParams().postId);
	const post = useSelector(store => store.posts[postId]);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// If post isn't in Redux state, fetch it from the API
	useEffect(
		() => {
			async function loadPost(id) {
				dispatch(fetchPostFromAPI(id));
			}
			if (!post) {
				loadPost(postId);
			}
		},
		[ dispatch, post, postId ]
	);

	// Deletes post from API and state
	function remove(id) {
		dispatch(deletePostFromAPI(id));
		navigate("/");
	}

	// Deletes comment from API and state
	function deleteComment(commentId) {
		console.log(postId);
		dispatch(deleteCommentFromAPI(postId, commentId));
	}

	// If no post, render Loading message
	if (!post) return <b>Loading...</b>;

	return (
		<div>
			<div>
				<PostView title={post.title} description={post.description} body={post.body} />
				<button onClick={() => navigate(`/posts/edit/${postId}`)}>Edit</button>
				<button onClick={() => remove(postId)}>Delete</button>
				<h5>Comments</h5>
				<CommentList comments={post.comments} deleteComment={deleteComment} postId={postId} />
				<NewCommentForm postId={postId} />
			</div>
		</div>
	);
};

export default Post;
