import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { TasksContext } from '../App';
import './Task.css';

const taskTypeStatuses = {
	active: 'active',
	completed: 'completed',
	editing: ' editing',
};

const Task = ({ taskCreated, taskDescription, id, taskType, taskTime }) => {
	
	const { showingElems, onEditTask, onUpdateTask, onDelete, onComplete, onPushedTaskTimerBtn } = useContext(TasksContext);
			
	const [ value, setValue ] = useState(taskDescription);

  const updateTask = (evt) => {
		const newTaskValue = evt.target.value;
		
		if (!newTaskValue.trim()) {
			setValue(taskDescription);
			onUpdateTask(id, taskDescription);
			return;
		};
		
    onUpdateTask(id, newTaskValue);
  };
	
  const inputChange = (evt) => setValue(evt.target.value);

	const taskCreatedToNow = formatDistanceToNow(taskCreated, { includeSeconds: true });
	let hidden = true;
	let editInput = '';

	if (taskType.includes(showingElems) || showingElems.includes('all')) hidden = false

	if (taskType.includes(taskTypeStatuses.editing)) {
		editInput = (
			<input type="text" className="edit" value={value} onChange={inputChange} onBlur={updateTask} />
		);
	}

	return (
		<li className={taskType} hidden={hidden}>
			<div className="view">
				<input className="toggle" type="checkbox" onClick={ () => onComplete(id) } />
				<label>
					<span className="title">{taskDescription}</span>
					<span className="description">
						<button type="button" className="icon icon-play" aria-label="Play" onClick={() => onPushedTaskTimerBtn(id, 'play')} />
						<button type="button" className="icon icon-pause" aria-label="Pause" onClick={() => onPushedTaskTimerBtn(id, 'pause')} />
						{taskTime}
					</span>
					<span className="description">created {taskCreatedToNow} ago</span>
				</label>
				<button type="button" className="icon icon-edit" aria-label="Edit" onClick={ () => onEditTask(id) } />
				<button type="button" className="icon icon-destroy" aria-label="Delete" onClick={ () => onDelete(id) } />
			</div>
			{editInput}
		</li>
	);
};

Task.propTypes = {
	taskCreated: PropTypes.number.isRequired,
	taskDescription: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	taskType: PropTypes.string.isRequired,
	taskTime: PropTypes.string.isRequired,
};

export { taskTypeStatuses, Task };
