import React from "react";

const PostView = ({ title, description, body }) => {
	return (
		<div>
			<div>
				<h3>{title}</h3>
				<h4>
					<i>{description}</i>
				</h4>
				<p>{body}</p>
			</div>
		</div>
	);
};

export default PostView;
