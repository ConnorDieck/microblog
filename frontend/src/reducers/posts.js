import { ADD_POST, ADD_COMMENT, EDIT_POST, DELETE_COMMENT, DELETE_POST, FETCH_POST, VOTE } from "../actions/types";

const rootReducer = (state = {}, action) => {
	let postsCopy = {};

	switch (action.type) {
		case FETCH_POST:
			// Adds a post from API to state
			return { ...state, [action.payload.id]: action.payload };
		case ADD_POST:
			// Adds a new post to state. Keys post in state.posts with its id
			return {
				...state,
				[action.payload.id]: { ...action.payload, comments: [] }
			};
		case EDIT_POST:
			// Edits existing post in state
			postsCopy = { ...state };
			postsCopy[action.payload.id] = action.payload.post;

			return {
				...postsCopy
			};
		case DELETE_POST:
			// Deletes given post from state
			postsCopy = { ...state.posts };
			delete postsCopy[action.payload];

			return {
				...postsCopy
			};
		case ADD_COMMENT:
			// Adds new comment to existing post
			let newComment = { ...action.payload.comment };
			postsCopy = { ...state };
			postsCopy[action.payload.id].comments = [ ...postsCopy[action.payload.id].comments, newComment ];

			return {
				...postsCopy
			};
		case DELETE_COMMENT:
			// Deletes comment from given post in state
			postsCopy = { ...state };
			postsCopy[action.payload.postId].comments = postsCopy[action.payload.postId].comments.filter(
				comment => comment.id !== action.payload.commentId
			);

			return {
				...postsCopy
			};
		case VOTE:
			// Updates number of votes in state and API
			let post = state[action.payload.postId];

			// If post doesn't already exist in state, don't update the store
			if (post) {
				return {
					...state,
					[action.payload.postId]: { ...post, votes: action.payload.votes }
				};
			} else {
				return state;
			}
		default:
			return state;
	}
};

export default rootReducer;
