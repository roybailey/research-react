import fetch from 'isomorphic-fetch';
const constants = require('../constants');

function fetchMovie(name) {
    return dispatch => {
        return fetch('http://127.0.0.1:3000/api/package?package=' + name)
            .then(req => req.json())
            .then(json => dispatch(receiveMovie(json)))
    }
}

function receiveMovie(json) {
    return {
        type: constants.RECEIVE_MOVIE,
        movie: json.movie,
        receivedAt: Date.now()
    }
}

function fetchMovies() {
    return dispatch => {
        return fetch('http://127.0.0.1:3000/api/packages?keyword=react-component')
            .then(req => req.json())
            .then(json => dispatch(receiveMovies(json)))
    }
}

function receiveMovies(json) {
    return {
        type: constants.RECEIVE_MOVIES,
        movies: json.movies,
        receivedAt: Date.now()
    }
}

module.exports = {fetchMovie, receiveMovie, fetchMovies, receiveMovies};
