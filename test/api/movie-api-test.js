var apiTester = require('./api-crud-executor.js');

apiTester({
        name: 'MovieAPI',
        baseurl: 'http://localhost:3030',
        baseapi: '/api/movie',
        resCacheData: [],
        resCacheKeys: function (response) {
            return {'id': response.id, 'title': response.title};
        },
        typeMatch: {
            id: {type: 'Number', required: true},
            title: {type: 'String', required: true},
            tagline: {type: 'String', required: false},
            released: {type: 'Number', required: true}
        },
        create: function () {
            return [
                {send: {title: 'Test Comedy', released: 1990}},
                {send: {title: 'Test Drama', released: 1991}},
                {send: {title: 'Test Action', released: 1992}},
                {send: {title: 'Test Documentary', released: 1993}},
                {send: {title: 'Test Horror', released: 1994}}
            ]
        },
        find: function () {
            return [
                this.resCacheData[0],
                this.resCacheData[Math.floor(this.resCacheData.length / 2)],
                this.resCacheData[this.resCacheData.length - 1]
            ];
        },
        patch: function () {
            return {
                id: this.resCacheData[0].id,
                title: this.resCacheData[0].title,
                released: 2000,
                tagline: "new tagline"
            };
        },
        update: function () {
            return {
                id: this.resCacheData[0].id,
                title: "Test Override",
                released: 2000,
                tagline: "Updated tagline"
            };
        },
        delete: function () {
            return this.resCacheData;
        }
    }
);

