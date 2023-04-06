import React, { useState, useEffect } from 'react';
import './App.css';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import { taskTypeStatuses } from '../Task';
import Footer from '../Footer';

const App = () => {
	const [ tasksData, setTasksData ] = useState([
      {
        taskDescription: 'Go for a walk',
        taskCreated: Date.now(),
        id: 1,
        done: false,
        taskType: taskTypeStatuses.active,
				taskTime: `0:00`,
				timerIsActive: true,
      },
      {
        taskDescription: 'Do my home task',
        taskCreated: Date.now(),
        id: 2,
        done: false,
        taskType: taskTypeStatuses.active,
				taskTime: `1:13`,
				timerIsActive: true,
      },
      {
        taskDescription: 'Have a dinner',
        taskCreated: Date.now(),
        id: 3,
        done: false,
        taskType: taskTypeStatuses.active,
				taskTime: `12:07`,
				timerIsActive: true,
      },
	]);
	
	const [ showingElems, setShowingElems ] = useState('all');
	
	useEffect(() => {
		const timerId = setInterval(refreshTaskTime, 1000);
		return () => clearInterval(timerId);
	}, []);
	
	
	function refreshTaskTime() {
		setTasksData((prevTasksData) => {
			const newTasksData = prevTasksData.map(task => {
				const newTask = {...task};
				if(!task.timerIsActive) return newTask

				const time = newTask.taskTime.split(':');
				let min = time[0];
				let sec = time[1];

				if(sec === '59') {
					sec = 0;
					min = +min + 1;
				} else {
					sec = +sec + 1;
				};

				if(sec < 10) sec = `0${sec}`

				newTask.taskTime = `${min}:${sec}`;
				return newTask;
			});

			return newTasksData;
		})
	};
	
	function findElem(id, arr) {
		return arr.findIndex((item) => item.id === id);
	};
	
	function pushedTaskTimerBtn(id, buttonType) {
		setTasksData((prevTasksData) => {
      const taskIndex = findElem(id, prevTasksData);
      const newTasksData = [...prevTasksData];
			
			newTasksData[taskIndex].timerIsActive = (buttonType === 'play');
      return newTasksData;
    });
	};

  function editTask(id) {
    setTasksData((prevTasksData) => {
      const taskIndex = findElem(id, prevTasksData);
      const newTasksData = [...prevTasksData.slice(0)];
			const elem = newTasksData[taskIndex];
			
      elem.taskType += taskTypeStatuses.editing;
      return newTasksData;
    });
  };

  function updateTask(id, newTaskDescription) {
    setTasksData((prevTasksData) => {
      const taskIndex = findElem(id, prevTasksData);
      const newTasksData = [...prevTasksData.slice(0)];
      const elem = newTasksData[taskIndex];
			
			elem.taskDescription = newTaskDescription;
      elem.taskType = taskTypeStatuses.active;
      if (elem.done) elem.taskType = taskTypeStatuses.completed;

      return newTasksData;
    });
  };

  function addTask(task, min = '0', sec = '00') {
    setTasksData((prevTasksData) => {
      const id = Math.round(Math.random() * 1000);
			const taskCreatedTime = Date.now();
			let minutes = min;
			let seconds = sec;
			
			if(!minutes || minutes < 0  || Number.isNaN(Number(minutes))) minutes = '0'
			if(!seconds || seconds > 59 || seconds <= 0 || Number.isNaN(Number(seconds))) seconds = '00'
			if(seconds < 10 && seconds > 0) seconds = `0${seconds}`
			
      const newTask = {
        taskDescription: task,
        taskCreated: taskCreatedTime,
        id,
        done: false,
        taskType: taskTypeStatuses.active,
				taskTime: `${minutes}:${seconds}`,
				timerIsActive: true,
      };
      const newArr = [...prevTasksData.slice(0)];
      newArr.push(newTask);

      return newArr;
    });
  };

  function deleteTask(id) {
    setTasksData((prevTasksData) => {
      const taskIndex = findElem(id, prevTasksData);

      const newTasksData = [...prevTasksData.slice(0, taskIndex), ...prevTasksData.slice(taskIndex + 1)];

      return newTasksData;
    });
  };

  function isTaskComplete(id) {
    setTasksData((prevTasksData) => {
      const taskIndex = findElem(id, prevTasksData);
      const elem = prevTasksData[taskIndex];
      const done = !elem.done;

      let taskType = taskTypeStatuses.active;
      if (done) taskType = taskTypeStatuses.completed;

      const newTaskItem = { ...elem, done, taskType };
      const newTasksData = [...prevTasksData.slice(0, taskIndex), newTaskItem, ...prevTasksData.slice(taskIndex + 1)];

      return newTasksData;
    });
  };

  function showElems(elems) {
		setShowingElems(elems);
	};

  function clearCompleted() {
    const newTasksData = tasksData.filter((el) => el.done === false);
    setTasksData(newTasksData);
  };

	const tasksLeft = tasksData.filter((el) => !el.done).length;
	
	const tasksContextValue = {
		showingElems,
		onEditTask: id => editTask(id),
		onUpdateTask: (id, newTaskDescription) => updateTask(id, newTaskDescription),
		onDelete: id => deleteTask(id),
		onComplete: id => isTaskComplete(id),
		onPushedTaskTimerBtn: (id, buttonType) => pushedTaskTimerBtn(id, buttonType),
	};

	return (
		<section className="todoapp">
			<header className="header">
				<h1>todos</h1>
				<NewTaskForm onAdd={ (task, min, sec) => addTask(task, min, sec) } />
			</header>
			<section className="main">
				<TasksContext.Provider value={tasksContextValue}>
					<TaskList tasks={tasksData} />
				</TasksContext.Provider>
				<Footer
					tasksLeft={tasksLeft}
					onClearCompleted={ () => clearCompleted() }
					onShowElems={ elems => showElems(elems) }
				/>
			</section>
		</section>
	);
};

export { App };

export const TasksContext = React.createContext();
