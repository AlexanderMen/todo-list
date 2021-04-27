import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './App.css';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import { taskTypeStatuses } from '../Task';
import Footer from '../Footer';

export default class App extends PureComponent {
	static defaultProps = {
    refreshInterval: 30000,
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
      },
      {
        taskDescription: 'Do my home task',
        taskCreated: Date.now(),
        id: 2,
        done: false,
        taskType: taskTypeStatuses.active,
      },
      {
        taskDescription: 'Have a dinner',
        taskCreated: Date.now(),
        id: 3,
        done: false,
        taskType: taskTypeStatuses.active,
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
	
	refreshTaskTime = () => this.setState(() => {
		const { refreshInterval } = this.props;
		const { timerId } = this.state;
		
		clearInterval(timerId);
		return {timerId: setInterval(this.refreshTaskTime, refreshInterval)};
	});

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

  addTask = (task) => {
    this.setState(({ tasksData }) => {
      const id = Math.round(Math.random() * 1000);
			const taskCreatedTime = Date.now();
      const newTask = {
        taskDescription: task,
        taskCreated: taskCreatedTime,
        id,
        done: false,
        taskType: taskTypeStatuses.active,
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
