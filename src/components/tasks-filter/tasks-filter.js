import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';

export default class TasksFilter extends Component {
	state = {selected: ["selected", "", ""]};

	static propTypes = {
		onHidden: PropTypes.func.isRequired,
		onVisibleAll: PropTypes.func.isRequired
	};

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
							onHidden(false, 'Active');
							this.isSelected(1);
						}}>Active</button>
				</li>
				<li>
					<button
						className={this.state.selected[2]}
						onClick={() => {
							onHidden(true, 'Completed');
							this.isSelected(2);
						}}>Completed</button>
				</li>
			</ul>
		);
	};
}

