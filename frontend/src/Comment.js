import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "./actions/posts";

const Comment = ({ text, postId, id }) => {
	const dispatch = useDispatch();

	return (
		<div>
			<p>{text}</p>
			<button onClick={() => dispatch(deleteComment(postId, id))}>X</button>
		</div>
	);
};

export default Comment;
