import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
	state = {
		value: ''
	};

	static defaultProps = {
		onAdd: () => {}
	};

	static propTypes = {
		onAdd: PropTypes.func
	};

	inputChange = (e) => {
		this.setState({value: e.target.value});
	};
	
	formSubmit = (e) => {
		e.preventDefault();
		this.props.onAdd(this.state.value);
		this.setState({value: ''});
	};
	
	render() {
		return (
			<form onSubmit={this.formSubmit}>
				<input className="new-todo"
							 placeholder="What needs to be done?"
							 autoFocus
							 value={this.state.value}
							 onChange={this.inputChange} />
			</form>
		);
	};
};

