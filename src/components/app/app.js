import React, {Component} from 'react';
import './app.css';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

export default class App extends Component {
	state = {
		tasksData: [
			{
				taskDescription: 'Go for a walk',
				taskCreated: new Date() - 16000,
				id: 1,
				done: false,
				isHidden: false,
				taskType: ''
			},
			{
				taskDescription: 'Do my home task',
				taskCreated: new Date() - 290000,
				id: 2,
				done: false,
				isHidden: false,
				taskType: ''
			},
			{
				taskDescription: 'Have a dinner',
				taskCreated: new Date() - 280000,
				id: 3,
				done: false,
				isHidden: false,
				taskType: ''
			}
		],
		
		showElems: ''
	};

	findElem = (id, arr) => arr.findIndex(item => item.id === id);

	editTask = (id) => {
		this.setState(({tasksData}) => {
			const taskIndex = this.findElem(id, tasksData);
			let newTasksData = [...tasksData.slice(0)];
			newTasksData[taskIndex].taskType = 'editing';
			
			return {tasksData: newTasksData};
		});
	};

	taskWasEdited = (id, newTaskDescription) => {
		this.setState(({tasksData}) => {
			const taskIndex = this.findElem(id, tasksData);
			let newTasksData = [...tasksData.slice(0)];
			let elem = newTasksData[taskIndex];
			
			elem.taskDescription = newTaskDescription;
			elem.taskType = '';
			if (elem.done) elem.taskType = 'completed'
			
			return {tasksData: newTasksData};
		});
	};

	addTask = (task) => {
		this.setState(({tasksData}) => {
			const id = Math.round(Math.random()*1000);
			const newTask = {
					taskDescription: task,
					taskCreated: new Date(),
					id,
					done: false,
					isHidden: false,
					taskType: ''
				};
			let newArr = [...tasksData.slice(0)]
			newArr.push(newTask);

			return {tasksData: newArr};
		});
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
		this.setState(({tasksData, showElems}) => {
			const taskIndex = this.findElem(id, tasksData);
			const elem = tasksData[taskIndex];
			const done = !elem.done;
			
			let taskType = '';
			if (done) taskType = 'completed'
			
			let isHidden = false;
			if (showElems === 'Active' && done) isHidden = true
			if (showElems === 'Completed' && !done) isHidden = true
			
			const newTaskItem = {...elem, done, taskType, isHidden};
			let newTasksData = [...tasksData.slice(0, taskIndex),
												  newTaskItem,
												  ...tasksData.slice(taskIndex + 1)];
			
			return {tasksData: newTasksData};
		});
	};

	isHidden = (done, showElems) => {
		this.setState(({tasksData}) => {
			
			const newTasksData = tasksData.map((el) => {
				let newEl = {...el};
				
				newEl.isHidden = false;
				if (newEl.done === !done) newEl.isHidden = true
				
				return newEl;
			});
			
			return {
				tasksData: newTasksData,
				showElems
			};
		});
	};

	visibleAll = () => {
		this.setState(({tasksData}) => {
			
			const newTasksData = tasksData.map((el) => {
				let newEl = {...el};
				
				newEl.isHidden = false;
				return newEl;
			});
			
			return {
				tasksData: newTasksData,
				showElems: ''
			};
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
						onEditTask={this.editTask}
						onTaskEdited={this.taskWasEdited}
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

