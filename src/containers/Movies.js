import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchMovies } from '../actions/movie-action'
import Loader from '../components/Loader'
import styles from './Movies.css'

function Movies({ neo4jMovies, fetchMovies }) {

  let moviesList = null;
  let loader = <Loader />;

  if(neo4jMovies === undefined || !neo4jMovies.length){

    /* fetch npm movies */
    fetchMovies()

  } else {

    /* neo4j movies have loaded... */
    loader = null;

    moviesList = (
      neo4jMovies.map(function (m) {
        return (
          <li key={m.id}>
            <Link to={`/movie/${m.id}`}>
              <p className={styles.name}>{m.title} ({m.released})</p>
            </Link>
          </li>
        )
      })
    )
  }

  return (
    <div className={styles.movies}>

      <div className={styles.row}>
        <h3 className={styles.title}>Select your movie...</h3>
      </div>

      { loader }

      <div className={styles.list}>
        <ul>      
          { moviesList }
        </ul>
      </div>

    </div>
  );
}

export default connect(
  state => ({ neo4jMovies: state.movies.neo4jMovies }),
  { fetchMovies }
)(Movies);
