import React from 'react';
import './footer.css';
import TasksFilter from '../tasks-filter';

const Footer = ({tasksLeft, onHidden, onVisibleAll, onClearCompleted}) => {
	
	return (
		<footer className="footer">
			<span className="todo-count">{tasksLeft} items left</span>
    	<TasksFilter
				onHidden={onHidden}
				onVisibleAll={onVisibleAll} />
    	<button
				className="clear-completed"
				onClick={onClearCompleted}>Clear completed</button>
    </footer>
	);
};

export default Footer;