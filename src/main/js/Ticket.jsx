import React from 'react';

class Ticket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guid: props.guid || 'TID-000',
            title: props.title || 'Unknown',
            date: 'TBD',
            todo: props.todo || 999
        };
    }

    render() {
        return (
            <div className="bow">
                <div className="bow-title">{this.state.title}</div>
                <div className="bow-guid">{this.state.guid}</div>

            </div>
        );
    }

    onChange(event) {
        this.setState({ todo: event.target.value });
    }
}

export default Ticket;
