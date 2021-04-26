import React from 'react';
import PropTypes from 'prop-types';
import './TaskList.css';
import Task from '../Task';

const TaskList = ({ tasks, showingElems, onDelete, onComplete, onEditTask, onUpdateTask }) => {
  const listElems = tasks.map((item) => {
    const { ...itemProps } = item;

    return (
      <Task
        key={item.id}
        {...itemProps}
        showingElems={showingElems}
        onEditTask={() => onEditTask(item.id)}
        onUpdateTask={onUpdateTask}
        onDelete={() => onDelete(item.id)}
        onComplete={() => onComplete(item.id)}
      />
    );
  });

  return <ul className="todo-list">{listElems}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
	showingElems: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
};

export default TaskList;
