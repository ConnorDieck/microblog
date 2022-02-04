import React from "react";

const Comment = ({ text, deleteComment, id }) => {
	const handleDelete = evt => {
		deleteComment(id);
	};

	return (
		<div>
			<p>{text}</p>
			<button onClick={handleDelete}>X</button>
		</div>
	);
};

export default Comment;
