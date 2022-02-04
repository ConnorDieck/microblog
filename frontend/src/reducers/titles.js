import { FETCH_TITLES, ADD_POST, DELETE_POST, EDIT_POST, VOTE } from "../actions/types";

function makeTitleFromPost({ id, title, description, votes }) {
	return { id, title, description, votes };
}

function orderByVotes(comments) {
	return comments.sort((a, b) => b.votes - a.votes);
}

export default function rootReducer(state = [], action) {
	switch (action.type) {
		case FETCH_TITLES:
			// Receives an action with an array of titles and adds them to state
			return [ ...orderByVotes(action.payload) ];
		case ADD_POST:
			// When a new post is added, add a new item to titles array in state
			return [ ...state, makeTitleFromPost(action.payload) ];
		case EDIT_POST:
			// When a post is edited, edit the associated item in the state array
			return state.map(title => (title.id === action.payload.id ? makeTitleFromPost(action.payload) : title));
		case DELETE_POST:
			// When a post is deleted, delete associated title
			return state.filter(title => title.id !== action.payload);
		case VOTE:
			// Updates number of votes in state and API
			return orderByVotes(
				state.map(
					title => (title.id === action.payload.postId ? { ...title, votes: action.payload.votes } : title)
				)
			);

		default:
			return state;
	}
}
