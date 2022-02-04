import React from "react";
import Comment from "./Comment";

function CommentList({ comments = [], deleteComment, postId }) {
	return comments.map(c => (
		<Comment //
			key={c.id}
			id={c.id}
			text={c.text}
			deleteComment={deleteComment}
			postId={postId}
		/>
	));
}

export default CommentList;
