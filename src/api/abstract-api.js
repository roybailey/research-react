'use strict';
import Neo4j from 'rainbird-neo4j';
import { LOG } from '../utils'

class AbstractAPI {

    constructor(db, apiName) {
        this.db = db;
        this.apiName = apiName;
        console.log("Requesting..." + this.apiName);
        // test out connectivity...
        this.find(null, (err, data)=> {
            if (err) {
                console.log(JSON.stringify(err, null, 2));
            }
            else {
                console.log(this.apiName);
                console.log(JSON.stringify(data));
            }
        });
    }


    log(action, data, params) {
        console.log("---------- " + action);
        console.log(JSON.stringify(data));
        console.log(JSON.stringify(params));
        console.log("----------");
    }

    logResults(name, results) {
        console.log(name + " returned " + results.length);
        if (results.length > 1) {
            console.log(JSON.stringify(results[0]) + "..." + JSON.stringify(results[results.length - 1]));
        }
        else if (results.length === 1) {
            console.log(JSON.stringify(results[0]));
        }
    }

    decodeRow(response, row) {
        return row;
    }

    decoder(name, results) {
        var response = [];
        results[0].forEach((row)=> {
            this.decodeRow(response, row);
        });
        LOG(name, true, response);
        return response;
    }


    // Return all records
    find(params, callback) {

        this.log(this.apiName + ".find", null, params);
        let QUERY = this.findCypher(params);

        this.db.query(QUERY.statement, QUERY.parameters, (err, results) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                this.logResults("find",results);
                callback(null, this.decoder("find", results));
            }
        });
    }


    // Gets a single record by id
    get(id, params, callback) {

        this.log(this.apiName + ".get", id, params);
        let QUERY = this.matchCypher(id, params);

        this.db.query(QUERY.statement, QUERY.parameters, (err, results) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                this.logResults("get", results);
                callback(null, this.decoder("get", results)[0]);
            }
        });
    }


    // Creates a new record
    create(data, params, callback) {

        this.log(this.apiName + "create", data, params);
        let QUERY = this.createCypher(data, params);

        this.db.query(QUERY.statement, QUERY.parameters, (err, results) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                this.logResults("create", results);
                callback(null, this.decoder("create", results)[0]);
            }
        });
    }


    // Updates (replaces) an existing record with new data
    update(id, data, params, callback) {

        this.log(this.apiName + ".update", data, params);
        let QUERY = this.updateCypher(id, data, params);

        this.db.query(QUERY.statement, QUERY.parameters, (err, results) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                this.logResults("update", results);
                callback(null, this.decoder("update", results)[0]);
            }
        });
    }


    // Extends the data of an existing record
    patch(id, data, params, callback) {

        this.log(this.apiName + "patch", data, params);
        let QUERY = this.patchCypher(id, data, params);

        this.db.query(QUERY.statement, QUERY.parameters, (err, results) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                this.logResults("patch", results);
                callback(null, this.decoder("patch", results)[0]);
            }
        });
    }


    // Removes an existing record by id
    remove(id, params, callback) {

        this.log(this.apiName + "remove", id, params);
        let QUERY = this.deleteCypher(id, params);

        this.db.query(QUERY.statement, QUERY.parameters, (err, results) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                this.logResults("remove", results);
                callback(null, results);
            }
        });
    }
}

export default AbstractAPI;

