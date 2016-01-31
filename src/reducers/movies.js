const constants = require('../constants');

const initialState = {
  isFetching: false, 
  neo4jMovies: [],
  selectedMovie: {}
};

function update(state = initialState, action = undefined) {

	switch (action.type) {

		case constants.RECEIVE_MOVIE:
			console.log(action.package);
			return { 
				npmPackages: state.npmPackages, 
				selectedPackage: action.package, 
				isFetching: false 
			};

		case constants.RECEIVE_MOVIES:
			console.log(action.movies);
			const neo4jMovies = [];
			/* loop through and parse the neo4j movies */
			action.packages.rows.map(function (p, i) {
				neo4jMovies.push(
					{
						id: i,
						name: p.key[1],
						description: p.key[2]
					}
				)
			});
			
			return { 
				neo4jMovies: neo4jMovies,
				selectedMovie: state.selectedMovie,
				isFetching: false 
			};

		default:
			return state;
  }
}

module.exports = update;
