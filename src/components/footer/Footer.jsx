import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
import TasksFilter from '../TasksFilter';

const Footer = ({ tasksLeft, onShowElems, onClearCompleted }) => (
  <footer className="footer">
    <span className="todo-count">{tasksLeft} items left</span>
    <TasksFilter onShowElems={onShowElems} />
    <button type="button" className="clear-completed" onClick={onClearCompleted}>
      Clear completed
    </button>
  </footer>
);

Footer.defaultProps = {
  tasksLeft: 0,
};

Footer.propTypes = {
  tasksLeft: PropTypes.number,
  onShowElems: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
