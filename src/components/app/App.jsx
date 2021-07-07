import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './App.css';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import { taskTypeStatuses } from '../Task';
import Footer from '../Footer';

export default class App extends PureComponent {
	static defaultProps = {
    refreshInterval: 1000,
  };
	
	static propTypes = {
    refreshInterval: PropTypes.number,
	};
	
  state = {
    tasksData: [
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
    ],

    showingElems: 'all',
  };
	
	componentDidMount() {
    const { refreshInterval } = this.props;
    this.state.timerId = setInterval(this.refreshTaskTime, refreshInterval);
  }

  componentWillUnmount() {
		const {timerId} = this.state;
    clearInterval(timerId);
  }
	
	refreshTaskTime = () => this.setState(({ timerId, tasksData }) => {
		const { refreshInterval } = this.props;
		
		const newTasksData = tasksData.map(task => {
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
		
		clearInterval(timerId);
		return {
			timerId: setInterval(this.refreshTaskTime, refreshInterval),
			tasksData: newTasksData,
		};
	});
	
	pushedTaskTimerBtn = (id, buttonType) => {
		this.setState(({ tasksData }) => {
      const taskIndex = this.findElem(id, tasksData);
      const newTasksData = [...tasksData];
			
			newTasksData[taskIndex].timerIsActive = (buttonType === 'play');
      return { tasksData: newTasksData };
    });
	};

  findElem = (id, arr) => arr.findIndex((item) => item.id === id);

  editTask = (id) => {
    this.setState(({ tasksData }) => {
      const taskIndex = this.findElem(id, tasksData);
      const newTasksData = [...tasksData.slice(0)];
			const elem = newTasksData[taskIndex];
			
      elem.taskType += taskTypeStatuses.editing;
      return { tasksData: newTasksData };
    });
  };

  updateTask = (id, newTaskDescription) => {
    this.setState(({ tasksData }) => {
      const taskIndex = this.findElem(id, tasksData);
      const newTasksData = [...tasksData.slice(0)];
      const elem = newTasksData[taskIndex];
			
			elem.taskDescription = newTaskDescription;
      elem.taskType = taskTypeStatuses.active;
      if (elem.done) elem.taskType = taskTypeStatuses.completed;

      return { tasksData: newTasksData };
    });
  };

  addTask = (task, min = '0', sec = '00') => {
    this.setState(({ tasksData }) => {
      const id = Math.round(Math.random() * 1000);
			const taskCreatedTime = Date.now();
			let minutes = min;
			let seconds = sec;
			
			if(!minutes || Number.isNaN(Number(minutes))) minutes = '0'
			if(!seconds || seconds > 59 || Number.isNaN(Number(seconds))) seconds = '00'
			
      const newTask = {
        taskDescription: task,
        taskCreated: taskCreatedTime,
        id,
        done: false,
        taskType: taskTypeStatuses.active,
				taskTime: `${minutes}:${seconds}`,
				timerIsActive: true,
      };
      const newArr = [...tasksData.slice(0)];
      newArr.push(newTask);

      return { tasksData: newArr };
    });
  };

  deleteTask = (id) => {
    this.setState(({ tasksData }) => {
      const taskIndex = this.findElem(id, tasksData);

      const newTasksData = [...tasksData.slice(0, taskIndex), ...tasksData.slice(taskIndex + 1)];

      return { tasksData: newTasksData };
    });
  };

  isTaskComplete = (id) => {
    this.setState(({ tasksData }) => {
      const taskIndex = this.findElem(id, tasksData);
      const elem = tasksData[taskIndex];
      const done = !elem.done;

      let taskType = taskTypeStatuses.active;
      if (done) taskType = taskTypeStatuses.completed;

      const newTaskItem = { ...elem, done, taskType };
      const newTasksData = [...tasksData.slice(0, taskIndex), newTaskItem, ...tasksData.slice(taskIndex + 1)];

      return { tasksData: newTasksData };
    });
  };

  showElems = showingElems => this.setState({showingElems,});

  clearCompleted = () => {
    const { tasksData } = this.state;
    const newTasksData = tasksData.filter((el) => el.done === false);
    this.setState({ tasksData: newTasksData });
  };

  render() {
    const { tasksData, showingElems } = this.state;
    const tasksLeft = tasksData.filter((el) => !el.done).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdd={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={tasksData}
            showingElems={showingElems}
            onEditTask={this.editTask}
            onUpdateTask={this.updateTask}
            onDelete={this.deleteTask}
            onComplete={this.isTaskComplete}
            onPushedTaskTimerBtn={this.pushedTaskTimerBtn}
          />
          <Footer
            tasksLeft={tasksLeft}
            onClearCompleted={this.clearCompleted}
            onShowElems={this.showElems}
          />
        </section>
      </section>
    );
  }
}
