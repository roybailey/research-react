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
                'unknown' as description,
                'todo' as status,
                '#FF0000' as color,
                movie.released as released,
                id(actor) as actorId,
                actor.name as actorName`
    }


    decodeRow(response, row) {
        var found = [];
        for(var index = 0; index < response.length && found.length === 0; ++index) {
            if(response[index].id === row.id)
                found.push(response[index]);
        }
        if(found.length !== 1) {
            console.log("creating record for id:"+row.id);
            found = [{
                id: row.id,
                title: row.title,
                tagline: row.tagline,
                description: row.description,
                status: row.status,
                color: row.color,
                released: row.released,
                tasks: []
            }];
            response.push(found[0]);
        }
        console.log(JSON.stringify(found[0],null,2));
        found[0].tasks.push({
            id: row.actorId,
            name: row.actorName,
            done: false
        });
        return found[0];
    }


    // Return all records
    findCypher(params) {
        return {
            statement: `MATCH (movie:Movie)-[r:ACTED_IN]-(actor:Person)` + MovieAPI.RETURN()
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

