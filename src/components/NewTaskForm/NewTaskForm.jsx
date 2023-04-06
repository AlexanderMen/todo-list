import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = ({ onAdd }) => {
	const [ value, setValue ] = useState('');
	const [ min, setMin ] = useState('');
	const [ sec, setSec ] = useState('');

  const inputChange = (evt) => {
		const { name, value: val } = evt.target;
		
		if(name === 'task') setValue(val)
		else if (name === 'min') setMin(val)
		else setSec(val)
  };

  const formSubmit = (evt) => {
    evt.preventDefault();
  };

	const doSubmit = (evt) => {
		if(evt.code === "Enter") {
			if (!value.trim()) return
			onAdd(value, min, sec);
			setValue('');
			setMin('');
			setSec('');
		}
	};
	
  return (
		<form className="new-todo-form" onSubmit={formSubmit}>
			<input
				className="new-todo"
				name='task'
				placeholder="Task"
				value={value}
				onChange={inputChange}
				onKeyUp={doSubmit} />
			<input
				className="new-todo-form__timer"
				name='min'
				placeholder="Min"
				value={min}
				onChange={inputChange}
				onKeyUp={doSubmit} />
			<input
				className="new-todo-form__timer"
				name='sec'
				placeholder="Sec"
				value={sec}
				onChange={inputChange}
				onKeyUp={doSubmit} />
		</form>
	);
};

NewTaskForm.defaultProps = {
	onAdd: () => {},
};

NewTaskForm.propTypes = {
	onAdd: PropTypes.func,
};

export default NewTaskForm;
