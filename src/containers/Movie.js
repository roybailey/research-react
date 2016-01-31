import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchMovie } from '../actions/movies';
import Loader from '../components/Loader';
import MovieItem from '../components/MovieItem';
import styles from './Movie.css';

class Movie extends Component {

    constructor(props) {
        super(props);
        this.fetchMovie = this.fetchMovie.bind(this);
    }

    componentDidMount() {
        /* fetch the neo4j movie */
        this.fetchMovie(this.props.params.name)
    }

    fetchMovie(name) {
        this.props.dispatch(fetchMovie(name))
    }

    render() {

        const { neo4jMovies, selectedMovie } = this.props;
        let movieItem = null;
        let loader = <Loader />;

        if (selectedMovie === undefined || !Object.keys(selectedMovie).length) {
            /* neo4j movie not loaded yet... */

        } else {
            /* neo4j movie has loaded... */
            loader = null;
            movieItem = <MovieItem item={selectedMovie}/>;
        }

        return (
            <div className={styles.movie}>
                { loader }
                { movieItem }
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        selectedMovie: state.movies.selectedMovie,
        neo4jMovies: state.movies.neo4jMovies
    }
}

export default connect(mapStateToProps)(Movie)
