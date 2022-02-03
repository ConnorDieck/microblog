import { ADD_POST, EDIT_POST, DELETE_POST, FETCH_TITLES } from "./types";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

// "Thunk" action creator for loading titles
export function fetchTitlesFromAPI() {
	return async function(dispatch) {
		let res = await axios.get(`${BASE_URL}/api/posts`);
		dispatch(gotTitles(res.data));
	};
}
// Normal action creator for loading titles
const gotTitles = posts => {
	return {
		type    : FETCH_TITLES,
		payload : posts
	};
};
