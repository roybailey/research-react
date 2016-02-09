'use strict';
import { LOG } from '../utils'
import Neo4j from 'rainbird-neo4j'
import AbstractAPI from './abstract-api'

class MovieAPI extends AbstractAPI {


    constructor(db, apiName) {
        super(db, apiName);
    }


    static MATCH_MOVIE() {
        return `MATCH (movie:Movie) `
    }

    static RETURN_MOVIE() {
        return `
        RETURN  id(movie) as id,
                movie.title as title,
                movie.tagline as tagline,
                'unknown' as description,
                movie.status as status,
                '#FF0000' as color,
                movie.released as released `
    }


    static MATCH_MOVIE_AND_ACTORS() {
        return `MATCH (movie:Movie)-[r:ACTED_IN]-(actor:Person) `
    }

    static RETURN_MOVIE_AND_ACTORS() {
        return `
        RETURN  id(movie) as id,
                movie.title as title,
                movie.tagline as tagline,
                'unknown' as description,
                movie.status as status,
                '#FF0000' as color,
                movie.released as released,
                id(actor) as actorId,
                actor.name as actorName `
    }


    decodeRow(response, row) {
        var found = [];
        for (var index = 0; index < response.length && found.length === 0; ++index) {
            if (response[index].id === row.id)
                found.push(response[index]);
        }
        if (found.length !== 1) {
            found = [{
                id: row.id,
                title: row.title,
                tagline: row.tagline,
                description: row.description,
                status: row.status || 'todo',
                color: row.color,
                released: row.released,
                tasks: []
            }];
            LOG("Created record for id " + row.id);
            response.push(found[0]);
        }
        found[0].tasks.push({
            id: row.actorId,
            name: row.actorName,
            done: false
        });
    }


    // Return all records
    findCypher(params) {
        var findStatement = {
            statement: MovieAPI.MATCH_MOVIE_AND_ACTORS() + MovieAPI.RETURN_MOVIE_AND_ACTORS()
        };
        console.log(JSON.stringify(findStatement, null, 2));
        return findStatement;
    }


    // Gets a single record by id
    matchCypher(id, params) {
        return {
            statement: MovieAPI.MATCH_MOVIE()
            + `WHERE id(movie) = ${id} `
            + MovieAPI.RETURN_MOVIE()
        };
    }


    // Creates a new record
    createCypher(data, params) {
        var createStatement = {
            statement: `
            MERGE (movie:Movie {title:'${params.title}'})
            ON CREATE SET movie += {params}
            ON CREATE SET movie.created = timestamp()
            ON MATCH SET movie.updated = timestamp() `
            + MovieAPI.RETURN_MOVIE(),
            parameters: {params: data}
        };
        console.log(JSON.stringify(createStatement, null, 2));
        return createStatement;
    }


    // Updates (replaces) an existing record with new data
    updateCypher(id, data, params) {
        var updateStatement = {
            statement: MovieAPI.MATCH_MOVIE()
            + `WHERE id(movie) = {id} SET `
            + ((data.title) ? `movie.title = {title}, ` : '')
            + ((data.tagline) ? `movie.tagline = {tagline}, ` : '')
            + ((data.status) ? `movie.status = {status}, ` : '')
            + `movie.updated = timestamp() `
            + MovieAPI.RETURN_MOVIE(),
            parameters: data
        };
        console.log(JSON.stringify(updateStatement, null, 2));
        return updateStatement;
    }


    // Extends the data of an existing record
    patchCypher(id, data, params) {
        var patchStatement = {
            statement: MovieAPI.MATCH_MOVIE()
            + `WHERE id(movie) = ${data.id}
            SET movie.title = '${data.title}',
                movie.tagline = '${data.tagline}',
                movie.released = ${parseInt(data.released)},
                movie.updated = timestamp()`
            + MovieAPI.RETURN_MOVIE()
        };
        console.log(JSON.stringify(patchStatement, null, 2));
        return patchStatement;
    }


    // Removes an existing record by id
    deleteCypher(id, params) {
        var deleteStatement = {
            statement: MovieAPI.MATCH_MOVIE() + `WHERE id(movie) = ${id} DELETE movie`
        };
        console.log(JSON.stringify(deleteStatement, null, 2));
        return deleteStatement;
    }
}

export default MovieAPI;

