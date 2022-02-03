import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "./actions/posts";
import { fetchPostFromAPI } from "./actions/posts";

import PostView from "./PostView";
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";

const Post = () => {
	const { postId } = useParams();
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

	function remove(id) {
		dispatch(deletePost(id));
		navigate("/");
	}

	if (!post) return <b>Loading...</b>;

	return (
		<div>
			<div>
				<PostView title={post.title} description={post.description} body={post.body} />
				<button onClick={() => navigate(`/posts/edit/${postId}`)}>Edit</button>
				<button onClick={() => remove(postId)}>Delete</button>
				<h5>Comments</h5>
				{post.comments.map(comment => (
					<Comment text={comment.text} key={comment.id} id={comment.id} postId={postId} />
				))}
				<NewCommentForm postId={postId} />
			</div>
		</div>
	);
};

export default Post;
