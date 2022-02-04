import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { sendPostToAPI, updatePostInAPI } from "./actions/posts";

const INITIAL_STATE = {
	title       : "",
	description : "",
	body        : "",
	comments    : []
};

const PostForm = ({ editMode }) => {
	const posts = useSelector(store => store.posts);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let postDetails = null;
	let { id } = useParams();

	// Fetch post details if editing post
	if (editMode) {
		let postsCopy = { ...posts };
		postDetails = postsCopy[id];
	}

	const [ formData, setFormData ] = useState(editMode ? postDetails : INITIAL_STATE);

	const handleChange = evt => {
		const { name, value } = evt.target;
		setFormData(formData => ({
			...formData,
			[name] : value
		}));
	};

	const handleSubmit = evt => {
		evt.preventDefault();
		if (!editMode) {
			dispatch(sendPostToAPI(formData));
		} else {
			dispatch(updatePostInAPI(formData));
		}
		navigate("/");
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="title-input">Title:</label>
			<input //
				id="title-input"
				value={formData.title}
				name="title"
				onChange={handleChange}
			/>
			<label htmlFor="description-input">Description:</label>
			<input //
				id="description-input"
				value={formData.description}
				name="description"
				onChange={handleChange}
			/>
			<label htmlFor="body-input">Body:</label>
			<input //
				id="body-input"
				value={formData.body}
				name="body"
				onChange={handleChange}
			/>

			<button type="submit">Save Changes</button>
			<button type="button" onClick={() => navigate("/")}>
				Cancel
			</button>
		</form>
	);
};

export default PostForm;
