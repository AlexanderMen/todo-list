import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    value: '',
		min: '',
		sec: '',
  };

  static defaultProps = {
    onAdd: () => {},
  };

  static propTypes = {
    onAdd: PropTypes.func,
  };

  inputChange = (evt) => {
		const { name } = evt.target;
		const { value } = evt.target;
		
		if(name === 'task') this.setState({ value })
		else if (name === 'min') this.setState({ min: value })
		else this.setState({ sec: value })
  };

  formSubmit = (evt) => {
    evt.preventDefault();
    const { onAdd } = this.props;
    const { value } = this.state;
		
		if (!value.trim()) return
    onAdd(value);
    this.setState({ value: '' });
  };

	doSubmit = (evt) => {
		if(evt.code === "Enter") {
			const { onAdd } = this.props;
			const { value, min, sec } = this.state;

			if (!value.trim()) return
			onAdd(value, min, sec);
			this.setState({
				value: '',
				min: '',
				sec: '',
			});
		}
	};
	
  render() {
    const { value, min, sec } = this.state;

    return (
      <form className="new-todo-form" onSubmit={this.formSubmit}>
        <input
        	className="new-todo"
        	name='task'
        	placeholder="Task"
        	value={value}
        	onChange={this.inputChange}
        	onKeyUp={this.doSubmit} />
        <input
        	className="new-todo-form__timer"
        	name='min'
        	placeholder="Min"
        	value={min}
        	onChange={this.inputChange}
        	onKeyUp={this.doSubmit} />
        <input
        	className="new-todo-form__timer"
        	name='sec'
        	placeholder="Sec"
        	value={sec}
        	onChange={this.inputChange}
        	onKeyUp={this.doSubmit} />
      </form>
    );
  }
}
