import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTitlesFromAPI } from "./actions/titles";
import { Link } from "react-router-dom";

const TitleList = () => {
	const titles = useSelector(store => store.titles);
	const dispatch = useDispatch();
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(
		() => {
			async function fetchTitles() {
				await dispatch(fetchTitlesFromAPI());
				setIsLoading(false);
			}

			if (isLoading) {
				fetchTitles();
			}
		},
		[ dispatch, isLoading, titles ]
	);

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
			</div>
		);
	});

	return <div>{titleTabs}</div>;
};

export default TitleList;
