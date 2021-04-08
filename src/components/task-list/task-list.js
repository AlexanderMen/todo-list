import React from 'react';
import './task-list.css';
import Task from '../task';

const TaskList = ( {tasks, onDelete} ) => {
	const listElems = tasks.map((item) => {
		const { id, ...itemProps} = item;
		
		return (
			<Task
				key={id}
				{...itemProps}
				onDelete={() => onDelete(id)}
			/>
		);
	});
	
	return (
		<ul className="todo-list">
			{listElems}
    </ul>
	);
};

export default TaskList;