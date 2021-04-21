import React from 'react';
import PropTypes from 'prop-types';
import './task-list.css';
import Task from '../task';

const TaskList = ({ tasks, onDelete, onDone, onEditTask, onTaskEdited }) => {
  const listElems = tasks.map((item) => {
    const { ...itemProps } = item;

    return (
      <Task
        key={item.id}
        {...itemProps}
        onEditTask={() => onEditTask(item.id)}
        onTaskEdited={onTaskEdited}
        onDelete={() => onDelete(item.id)}
        onDone={() => onDone(item.id)}
      />
    );
  });

  return <ul className="todo-list">{listElems}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onTaskEdited: PropTypes.func.isRequired,
};

export default TaskList;
