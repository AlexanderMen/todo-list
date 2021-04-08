import React, {Component} from 'react';
import './app.css';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

export default class App extends Component {
	state = {
		tasksData: [
			{
				taskDescription: 'Completed task',
				taskCreated: new Date() - 16000,
				id: 1
			},
			{
				taskDescription: 'Editing task',
				taskCreated: new Date() - 290000,
				id: 2
			},
			{
				taskDescription: 'Active task',
				taskCreated: new Date() - 280000,
				id: 3
			}
		]
	};

	deleteTask = (id) => {
		this.setState(({tasksData}) => {
			const taskIndex = tasksData.findIndex(item => item.id === id);
			
			const newTasksData = [...tasksData.slice(0, taskIndex),
														...tasksData.slice(taskIndex + 1)];
			
			return {tasksData: newTasksData};
		});
	};
	
	render() {
		return (
			<section className="todoapp">
				<header className="header">
					<h1>todos</h1>
					<NewTaskForm />
				</header>
				<section className="main">
					<TaskList 
						tasks={this.state.tasksData}
						onDelete={this.deleteTask}
					/>
					<Footer />
				</section>
			</section>
		);
	};
}

