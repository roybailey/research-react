import _ from 'lodash';
import React from 'react';
import dataGenerator from './dataGenerator';
import HelloForm from './HelloForm';
import Ticket from './Ticket';
import LineChart from './TicketChart';
import appStyle from './App.less';

class App extends React.Component {

    constructor() {
        super();
        this._allData = dataGenerator.generate(50);
        var domain = [0, 30];
        this.state = {
            data: this.getData(domain),
            domain: {x: domain, y: [0, 100]},
            tooltip: null,
            prevDomain: null,
            showingAllTooltips: false
        };
    }

    getData(domain) {
        return _.filter(this._allData, this.isInDomain.bind(null, domain));
    }

    addDatum(domain) {
        this._allData.push(dataGenerator.generateDatum(domain));
        return this.getData(domain);
    }

    removeDatum(domain) {
        var match = _.find(this._allData, this.isInDomain.bind(null, domain));
        if (match) {
            this._allData = _.reject(this._allData, {id: match.id});
        }
        return this.getData(domain);
    }

    isInDomain(domain, d) {
        return d.x >= domain[0] && d.x <= domain[1];
    }

    render() {
        var data = {
            series1: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
            series2: [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ],
            series3: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
        };

        return (
            <div className="App">
                <LineChart data={data} />
                <HelloForm />
                <hr />
                <Ticket guid="TID-101" title="Something Interesting" todo="240"/>
                <Ticket guid="TID-102" title="Something Important" todo="120"/>
                <Ticket guid="TID-103" title="Something Nice to Have" todo="80"/>
            </div>
        );
    }

    setAppState(partialState, callback) {
        return this.setState(partialState, callback);
    }
}

export default App;
