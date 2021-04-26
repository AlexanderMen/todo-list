import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    value: '',
  };

  static defaultProps = {
    onAdd: () => {},
  };

  static propTypes = {
    onAdd: PropTypes.func,
  };

  inputChange = (evt) => {
    this.setState({ value: evt.target.value });
  };

  formSubmit = (evt) => {
    evt.preventDefault();
    const { onAdd } = this.props;
    const { value } = this.state;
		
		if (!value.trim()) return
    onAdd(value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;

    return (
      <form onSubmit={this.formSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" value={value} onChange={this.inputChange} />
      </form>
    );
  }
}
