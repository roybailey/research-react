'use strict';
import Neo4j from 'rainbird-neo4j'
import AbstractAPI from './abstract-api'

class MovieAPI extends AbstractAPI {


    constructor(db, apiName) {
        super(db, apiName);
    }


    static RETURN() {
        return `
        RETURN  id(movie) as id,
                movie.title as title,
                movie.tagline as tagline,
                movie.released as released`
    }


    decodeRow(row) {
        return {
            id: row.id,
            title: row.title,
            tagline: row.tagline,
            released: row.released
        };
    }


    // Return all records
    findCypher(params) {
        return {
            statement: `MATCH (movie:Movie)` + MovieAPI.RETURN()
        };
    }


    // Gets a single record by id
    matchCypher(id, params) {
        return {
            statement: `
            MATCH (movie:Movie)
            WHERE id(movie) = ${id}`
            + MovieAPI.RETURN()
        };
    }


    // Creates a new record
    createCypher(data, params) {
        return {
            statement: `
            MERGE (movie:Movie {title:'${params.title}'})
            ON CREATE SET movie += {params}
            ON CREATE SET movie.created = timestamp()
            ON MATCH SET movie.updated = timestamp()`
            + MovieAPI.RETURN(),
            parameters: {params: data}
        };
    }


    // Updates (replaces) an existing record with new data
    updateCypher(id, data, params) {
        return {
            statement: `
            MATCH (movie:Movie)
            WHERE id(movie) = {id}
            SET movie.title = {title},
                movie.tagline = {tagline},
                movie.updated = timestamp()`
            + MovieAPI.RETURN(),
            parameters: data
        };
    }


    // Extends the data of an existing record
    patchCypher(id, data, params) {
        return {
            statement: `
            MATCH (movie:Movie)
            WHERE id(movie) = ${data.id}
            SET movie.title = '${data.title}',
                movie.tagline = '${data.tagline}',
                movie.released = ${parseInt(data.released)},
                movie.updated = timestamp()`
            + MovieAPI.RETURN()
        };
    }


    // Removes an existing record by id
    deleteCypher(id, params) {
        return {
            statement: `
            MATCH (movie:Movie)
            WHERE id(movie) = ${id}
            DELETE movie`
        };
    }
}

export default MovieAPI;

