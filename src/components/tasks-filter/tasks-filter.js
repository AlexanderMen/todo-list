import React, {Component} from 'react';
import './tasks-filter.css';

export default class TasksFilter extends Component {
	state = {selected: ["selected", "", ""]};

	isSelected = (num) => {
		let newArr = ['', '', ''];
		newArr[num] = 'selected';
		
		this.setState({selected: newArr});
	};
	
	render () {
		const {onHidden, onVisibleAll} = this.props;
		
		return (
			<ul className="filters">
				<li>
					<button 
						className={this.state.selected[0]}
						onClick={() => {
							onVisibleAll();
							this.isSelected(0);
						}}>All</button>
				</li>
				<li>
					<button
						className={this.state.selected[1]}
						onClick={() => {
							onHidden(false);
							this.isSelected(1);
						}}>Active</button>
				</li>
				<li>
					<button
						className={this.state.selected[2]}
						onClick={() => {
							onHidden(true);
							this.isSelected(2);
						}}>Completed</button>
				</li>
			</ul>
		);
	};
}

