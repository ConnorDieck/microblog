import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "./actions/posts";

const INITIAL_STATE = {
	text : ""
};

const NewCommentForm = ({ postId }) => {
	const dispatch = useDispatch();

	const [ formData, setFormData ] = useState(INITIAL_STATE);

	const handleChange = evt => {
		const { name, value } = evt.target;
		setFormData(formData => ({
			...formData,
			[name] : value
		}));
	};

	const handleSubmit = evt => {
		evt.preventDefault();
		dispatch(addComment(postId, formData));
		setFormData(INITIAL_STATE);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="comment-text">Text:</label>
			<input //
				id="comment-text"
				value={formData.text}
				name="text"
				onChange={handleChange}
			/>
			<button type="submit">Add</button>
		</form>
	);
};

export default NewCommentForm;
