import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

export default class Task extends Component{
	state = {
		taskTimeCreated: formatDistanceToNow(this.props.taskCreated,
		{includeSeconds: true}),
		value: this.props.taskDescription
	};

	static defaultProps = {
		refreshInterval: 30000
	};

	static propTypes = {
		refreshInterval: PropTypes.number,
		onEditTask: PropTypes.func.isRequired,
		onTaskEdited: PropTypes.func.isRequired,
		onDelete: PropTypes.func.isRequired,
		onDone: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.timerId = setInterval(this.refreshTaskTime, this.props.refreshInterval);
	};

	componentWillUnmount() {
		clearInterval(this.timerId);
	};

	refreshTaskTime = () => {
		this.setState({taskTimeCreated:
									 formatDistanceToNow(this.props.taskCreated,
									 {includeSeconds: true})
									});
	};

	taskWasEdited = (e) => {
		this.props.onTaskEdited(this.props.id, e.target.value);
	};

	inputChange = (e) => this.setState({value: e.target.value});

	render() {
		const {taskDescription, isHidden, onDone, onDelete, onEditTask} = this.props;
		
		let editInput = '';
		if (this.props.taskType === 'editing') {
			editInput = <input
										type="text"
										className="edit"
										autoFocus
										value={this.state.value}
										onChange={this.inputChange}
										onBlur={this.taskWasEdited} />
		}

		return (
			<li
				className={this.props.taskType}
				hidden={isHidden}>
				<div className="view">
					<input className="toggle"
						type="checkbox"
						onClick={onDone} />
					<label>
						<span className="description">{taskDescription}</span>
						<span className="created">created {this.state.taskTimeCreated} ago</span>
					</label>
					<button 
						className="icon icon-edit"
						onClick={onEditTask}></button>
					<button
						className="icon icon-destroy"
						onClick={onDelete}></button>
				</div>
				{editInput}
			</li>
		);
	};
}