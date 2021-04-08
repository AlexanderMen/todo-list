import React, {Component} from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

export default class Task extends Component{
	state = {
		done: false
	};

	isDone = () => {
		this.setState(
			({done}) => ({done: !done})
		);
	};
	
	render() {
		const {taskDescription, taskCreated} = this.props;
		const {done} = this.state;
		let taskType = '';
		
		if (done) taskType = 'completed'
		
		let editInput = '';
		if (taskType === 'editing') {
			editInput = <input type="text" className="edit" value="Editing task" />
		}

		return (
			<li className={taskType}>
				<div className="view">
					<input className="toggle"
						type="checkbox"
						onClick={this.isDone}
					/>
					<label>
						<span className="description">{taskDescription}</span>
						<span className="created">created {formatDistanceToNow(taskCreated, {
							includeSeconds: true
						})} ago</span>
					</label>
					<button className="icon icon-edit"></button>
					<button
						className="icon icon-destroy"
						onClick={this.props.onDelete}
					></button>
				</div>
				{editInput}
			</li>
		);
	};
}


