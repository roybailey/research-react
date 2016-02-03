import React from 'react'
import { connect } from 'react-redux'
import { fetchMovies } from '../actions/movie-action'
import { Link } from 'react-router'
import styles from './Home.css'

function Home({ items, fetchMovies }) {

    let movies = null;

    if (items !== undefined) {
        movies = items
    }

    return (
        <div className={styles.home}>
            <p className={styles.description}>
                <Link to="/movies">Link to Movies...</Link>
            </p>
        </div>
    );
}

export default connect(state => ({}))(Home);
