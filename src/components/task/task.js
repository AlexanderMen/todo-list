import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

const Task = ( {taskType, taskDescription, taskCreated} ) => {
	
	let editInput = '';
	if (taskType === 'editing') {
		editInput = <input type="text" className="edit" value="Editing task" />
	}
	
	return (
		<li className={taskType}>
    	<div className="view">
      	<input className="toggle" type="checkbox" />
        <label>
        	<span className="description">{taskDescription}</span>
          <span className="created">created {formatDistanceToNow(taskCreated, {
						includeSeconds: true
					})} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
    	</div>
			{editInput}
  	</li>
	);
};

export default Task;