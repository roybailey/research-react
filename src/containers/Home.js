import React from 'react'
import { connect } from 'react-redux'
import { fetchPackages } from '../actions/movies'
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
                <Link to="/movies">No idea how this works...</Link>
            </p>
        </div>
    );
}

export default connect(state => ({}))(Home);
