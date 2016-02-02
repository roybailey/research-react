// http://feathersjs.com/
'use strict';

import feathers from 'feathers';
import bodyParser from 'body-parser';
import multer from 'multer';

import Neo4j from 'rainbird-neo4j';

import MovieAPI from './src/api/movie-api';

var upload = multer({dest: 'uploads/'});

var db = new Neo4j('http://localhost:7474', 'neo4j', 'localhost');
var movieService = new MovieAPI(db, 'MoviesAPI');

var app = feathers();

console.log(__dirname);

app.configure(feathers.rest())
    .use(bodyParser.json())
    .use('/', feathers.static(__dirname + '/'))
    .use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Content-Type", "application/json");
        next();
    })
    .post('/upload/movie', upload.single('file'), function (req, res, next) {
        console.log("Movies Uploading...");
        console.log(req.file);
        console.log(JSON.stringify(req.body));
    })
    .use('/api/movie', movieService)
    //.get('/', function (req, res) {
    //    res.redirect('/public/index.html');
    //})
    .listen(3030);
