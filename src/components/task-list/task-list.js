import React from 'react';
import './task-list.css';
import Task from '../task';

const TaskList = ( {tasks} ) => {
	
	const listElems = tasks.map((item) => {
		
		const { id, ...itemProps} = item;
		
		return (
			<Task
				key={id}
				{...itemProps} />
		);
	});
	
	return (
		<ul className="todo-list">
			{listElems}
    </ul>
	);
};

export default TaskList;