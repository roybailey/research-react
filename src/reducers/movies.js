const constants = require('../constants');

const initialState = {
  isFetching: false, 
  neo4jMovies: [],
  selectedMovie: {}
};

function update(state = initialState, action = undefined) {

	switch (action.type) {

		case constants.RECEIVE_MOVIE:
			console.log(action.movie);
			return { 
				neo4jMovies: state.neo4jMovies,
				selectedMovie: action.movie,
				isFetching: false 
			};

		case constants.RECEIVE_MOVIES:
			console.log(action.movies);
			return {
				neo4jMovies: action.movies,
				selectedMovie: state.selectedMovie,
				isFetching: false 
			};

		default:
			return state;
  }
}

module.exports = update;
