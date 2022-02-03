import { FETCH_TITLES } from "../actions/types";

function makeTitleFromPost({ id, title, description, votes }) {
	return { id, title, description, votes };
}

export default function rootReducer(state = [], action) {
	switch (action.type) {
		case FETCH_TITLES:
			// Receives an action with an array of titles and adds them to state
			return [ ...action.payload ];
		default:
			return state;
	}
}
