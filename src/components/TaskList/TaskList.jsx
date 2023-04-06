import React from 'react';
import PropTypes from 'prop-types';
import './TaskList.css';
import { Task } from '../Task';

const TaskList = ({ tasks }) => {
  const listElems = tasks.map((item) => {
    const { ...itemProps } = item;

    return (
      <Task
        key={item.id}
        {...itemProps}
      />
    );
  });

  return <ul className="todo-list">{listElems}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
		taskDescription: PropTypes.string,
		taskCreated: PropTypes.number,
		id: PropTypes.number,
		done: PropTypes.bool,
		taskType: PropTypes.string,
		taskTime: PropTypes.string,
		timerIsActive: PropTypes.bool,
	})).isRequired,
};

export default TaskList;
