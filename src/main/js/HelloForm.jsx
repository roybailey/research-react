import React from 'react';
import HelloSayer from './HelloSayer';
import Style from '../sass/HelloForm.scss';

class HelloForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = { name: 'world' };
	}

	render() {
		return (
        <div className="hello-form">
			<input type="text" onChange={this.onChange.bind(this)} />
			<HelloSayer name={this.state.name} />
		</div>);
	}

	onChange(event) {
		this.setState({ name: event.target.value });
	}
}

export default HelloForm;
