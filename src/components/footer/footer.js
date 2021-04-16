import React from 'react';
import PropTypes from 'prop-types';
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

Footer.defaultProps = {
	tasksLeft: 0
};

Footer.propTypes = {
	tasksLeft: PropTypes.number,
	onHidden: PropTypes.func.isRequired,
	onVisibleAll: PropTypes.func.isRequired,
	onClearCompleted: PropTypes.func.isRequired
};

export default Footer;