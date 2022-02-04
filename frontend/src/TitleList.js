import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTitlesFromAPI } from "./actions/titles";
import { sendVoteToAPI } from "./actions/posts";
import { Link } from "react-router-dom";

const TitleList = () => {
	const titles = useSelector(store => store.titles);
	const dispatch = useDispatch();
	const [ isLoading, setIsLoading ] = useState(true);

	// Get titles from API and add to state
	useEffect(
		function() {
			async function fetchTitles() {
				await dispatch(fetchTitlesFromAPI());
				setIsLoading(false);
			}

			if (isLoading) {
				fetchTitles();
			}
		},
		[ dispatch, isLoading ]
	);

	function castVote(postId, direction) {
		dispatch(sendVoteToAPI(postId, direction));
	}

	if (isLoading) return <b>Loading...</b>;

	if (!isLoading && titles.length === 0) {
		return <b>Please add a post!</b>;
	}

	const titleTabs = titles.map(title => {
		return (
			<div key={title.id}>
				<Link to={`/posts/${title.id}`}>{title.title}</Link>
				<br />
				<p>{title.description}</p>
				<button onClick={evt => castVote(title.id, "up")}>+1</button>
				<button onClick={evt => castVote(title.id, "down")}>-1</button>
			</div>
		);
	});

	return <div>{titleTabs}</div>;
};

export default TitleList;
