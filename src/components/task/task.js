import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

export default class Task extends Component {
  static defaultProps = {
    refreshInterval: 30000,
  };

  static propTypes = {
    refreshInterval: PropTypes.number,
    taskCreated: PropTypes.string.isRequired,
    taskDescription: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isHidden: PropTypes.bool.isRequired,
    taskType: PropTypes.string.isRequired,
    onEditTask: PropTypes.func.isRequired,
    onTaskEdited: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { taskCreated, taskDescription } = this.props;
    this.state = {
      taskTimeCreated: formatDistanceToNow(taskCreated, { includeSeconds: true }),
      value: taskDescription,
    };
  }

  componentDidMount() {
    const { refreshInterval } = this.props;
    this.timerId = setInterval(this.refreshTaskTime, refreshInterval);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  refreshTaskTime = () => {
    const { taskCreated } = this.props;

    this.setState({ taskTimeCreated: formatDistanceToNow(taskCreated, { includeSeconds: true }) });
  };

  taskWasEdited = (evt) => {
    const { onTaskEdited, id } = this.props;

    onTaskEdited(id, evt.target.value);
  };

  inputChange = (evt) => this.setState({ value: evt.target.value });

  render() {
    const { taskDescription, isHidden, onDone, onDelete, onEditTask, taskType } = this.props;
    const { value, taskTimeCreated } = this.state;

    let editInput = '';
    if (taskType === 'editing') {
      editInput = (
        <input type="text" className="edit" value={value} onChange={this.inputChange} onBlur={this.taskWasEdited} />
      );
    }

    return (
      <li className={taskType} hidden={isHidden}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onDone} />
          <label>
            <span className="description">{taskDescription}</span>
            <span className="created">created {taskTimeCreated} ago</span>
          </label>
          <button type="button" className="icon icon-edit" aria-label="Edit" onClick={onEditTask} />
          <button type="button" className="icon icon-destroy" aria-label="Delete" onClick={onDelete} />
        </div>
        {editInput}
      </li>
    );
  }
}
