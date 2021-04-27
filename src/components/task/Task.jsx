import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';

const taskTypeStatuses = {
	active: 'active',
	completed: 'completed',
	editing: ' editing',
};

class Task extends Component {

  static propTypes = {
		taskCreated: PropTypes.number.isRequired,
    taskDescription: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    showingElems: PropTypes.string.isRequired,
    taskType: PropTypes.string.isRequired,
    onEditTask: PropTypes.func.isRequired,
    onUpdateTask: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { taskDescription } = this.props;
    this.state = {
      value: taskDescription,
    };
  };

  updateTask = (evt) => {
    const { onUpdateTask, id, taskDescription } = this.props;
		const newTaskValue = evt.target.value;
		
		if (!newTaskValue.trim()) {
			this.setState({ value: taskDescription });
			onUpdateTask(id, taskDescription);
			return;
		};
		
    onUpdateTask(id, newTaskValue);
  };
	
  inputChange = (evt) => this.setState({ value: evt.target.value });

  render() {
    const { taskDescription, onComplete, onDelete, onEditTask, taskType, showingElems, taskCreated } = this.props;
    const { value } = this.state;
		const taskCreatedToNow = formatDistanceToNow(taskCreated, { includeSeconds: true });
		let hidden = true;
    let editInput = '';
		
		if (taskType.includes(showingElems) || showingElems.includes('all')) hidden = false
		
    if (taskType.includes(taskTypeStatuses.editing)) {
      editInput = (
        <input type="text" className="edit" value={value} onChange={this.inputChange} onBlur={this.updateTask} />
      );
    }

    return (
      <li className={taskType} hidden={hidden}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onComplete} />
          <label>
            <span className="description">{taskDescription}</span>
            <span className="created">created {taskCreatedToNow} ago</span>
          </label>
          <button type="button" className="icon icon-edit" aria-label="Edit" onClick={onEditTask} />
          <button type="button" className="icon icon-destroy" aria-label="Delete" onClick={onDelete} />
        </div>
        {editInput}
      </li>
    );
  }
}

export { taskTypeStatuses, Task } ;
