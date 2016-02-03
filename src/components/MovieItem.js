import React from 'react'
import styles from './MovieItem.css'
import marked from 'marked'

function MovieItem(props) {

    const { title, released, tagline } = props.item;

    //let authorName = null;
    //if (author !== undefined) {
    //    if (author.name !== undefined) {
    //        authorName = author.name
    //    }
    //}

    return (
        <div className={styles.item}>
            {
                title &&
                <h2 className={styles.name}>{title} </h2>
            }
            {
                released &&
                <h2 className={styles.authorName}>released {released} </h2>
            }
            {
                tagline &&
                <div dangerouslySetInnerHTML={{__html: marked(tagline) }}/>
            }
        </div>
    );
}

export default MovieItem
