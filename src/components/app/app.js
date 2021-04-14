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
				id: 1,
				done: false,
				isHidden: false
			},
			{
				taskDescription: 'Editing task',
				taskCreated: new Date() - 290000,
				id: 2,
				done: false,
				isHidden: false
			},
			{
				taskDescription: 'Active task',
				taskCreated: new Date() - 280000,
				id: 3,
				done: false,
				isHidden: false
			}
		]
	};

	findElem = (id, arr) => arr.findIndex(item => item.id === id);

	addTask = (task) => {
		const id = Math.round(Math.random()*1000);
		const newTask = {
				taskDescription: task,
				taskCreated: new Date() - 16000,
				id,
				done: false,
				isHidden: false
			};
		let newArr = [...this.state.tasksData]
		newArr.push(newTask);
		
		this.setState({tasksData: newArr});
	};

	deleteTask = (id) => {
		this.setState(({tasksData}) => {
			const taskIndex = this.findElem(id, tasksData);
			
			const newTasksData = [...tasksData.slice(0, taskIndex),
														...tasksData.slice(taskIndex + 1)];
			
			return {tasksData: newTasksData};
		});
	};

	isDone = (id) => {
		this.setState(({tasksData}) => {
			const taskIndex = this.findElem(id, tasksData);
			const newTaskItem = {...tasksData[taskIndex], done: !tasksData[taskIndex].done};
			let newTasksData = [...tasksData.slice(0, taskIndex),
												  newTaskItem,
												  ...tasksData.slice(taskIndex + 1)];
			
			return {tasksData: newTasksData};
		});
	};

	isHidden = (done) => {
		this.setState(({tasksData}) => {
			
			const newTasksData = tasksData.map((el) => {
				let newEl = {...el};
				
				newEl.isHidden = false;
				if (newEl.done === !done) {
					newEl.isHidden = true;
				};
				return newEl;
			});
			
			return {tasksData: newTasksData};
		});
	};

	visibleAll = () => {
		this.setState(({tasksData}) => {
			
			const newTasksData = tasksData.map((el) => {
				let newEl = {...el};
				
				newEl.isHidden = false;
				return newEl;
			});
			
			return {tasksData: newTasksData};
		});
	};

	clearCompleted = () => {
		let newTasksData = this.state.tasksData.filter((el) => el.done === false);
		this.setState({tasksData: newTasksData});
	};
	
	render() {
		const tasksLeft = this.state.tasksData.filter((el) => !el.done).length;
		
		return (
			<section className="todoapp">
				<header className="header">
					<h1>todos</h1>
					<NewTaskForm 
					onAdd={this.addTask} />
				</header>
				<section className="main">
					<TaskList 
						tasks={this.state.tasksData}
						onDelete={this.deleteTask}
						onDone={this.isDone} />
					<Footer
						tasksLeft={tasksLeft}
						onClearCompleted={this.clearCompleted}
						onHidden={this.isHidden}
						onVisibleAll={this.visibleAll} />
				</section>
			</section>
		);
	};
}

