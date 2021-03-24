import React from 'react';
import './app.css';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

const tasksData = [
	{
		taskType: 'completed',
		taskDescription: 'Completed task',
		taskCreated: new Date() - 16000,
		id: 1
	},
	{
		taskType: 'editing',
		taskDescription: 'Editing task',
		taskCreated: new Date() - 290000,
		id: 2
	},
	{
		taskType: '',
		taskDescription: 'Active task',
		taskCreated: new Date() - 280000,
		id: 3
	}
];

const App = () => {
	return (
		<section className="todoapp">
			<header className="header">
				<h1>todos</h1>
				<NewTaskForm />
			</header>
			<section className="main">
				<TaskList tasks={tasksData} />
				<Footer />
			</section>
		</section>
	);
};

export default App;