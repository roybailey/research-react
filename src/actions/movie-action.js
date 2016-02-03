import fetch from 'isomorphic-fetch'
import request from 'superagent'
const constants = require('../constants');

function fetchMovie(id) {
    return dispatch => {
        console.log("REQUESTING MOVIE...");
        return request.get('/api/movie/'+id)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                console.log("INCOMING MOVIE...");
                console.log(res.body);
                if (!err) {
                    dispatch(receiveMovie(res.body));
                }
            });
        //return fetch('/api/movie/' + id)
        //    .then(req => req.json())
        //    .then(json => dispatch(receiveMovie(json)))
    }
}

function receiveMovie(json) {
    return {
        type: constants.RECEIVE_MOVIE,
        movie: json,
        receivedAt: Date.now()
    }
}

function fetchMovies() {
    return dispatch => {
        console.log("REQUESTING MOVIES...");
        return request.get('/api/movie')
            .set('Accept', 'application/json')
            .end(function (err, res) {
                console.log("INCOMING LIST...");
                console.log(res.body);
                if (!err) {
                    dispatch(receiveMovies(res.body));
                }
            });
        //return fetch('/api/movie')
        //    .then(req => req.json())
        //    .then(json => dispatch(receiveMovies(json)))
    }
}

function receiveMovies(json) {
    return {
        type: constants.RECEIVE_MOVIES,
        movies: json,
        receivedAt: Date.now()
    }
}

module.exports = {fetchMovie, receiveMovie, fetchMovies, receiveMovies};
