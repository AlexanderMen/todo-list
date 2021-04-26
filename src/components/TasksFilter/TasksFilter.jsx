import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TasksFilter.css';

export default class TasksFilter extends Component {
  state = { selectedElems: 'all' };

  static propTypes = {
    onShowElems: PropTypes.func.isRequired,
  };

  isSelected = (showElemsType) => {
		this.setState({ selectedElems: showElemsType });
  };
	
	makeListItem = (showElems) => {
		const { onShowElems } = this.props;
		const { selectedElems } = this.state;
		const showElemsType = showElems.toLowerCase();
		let selected = '';
		
		if (selectedElems === showElemsType) selected = 'selected'
		
		return (
			<li>
				<button
					type="button"
					className={selected}
					onClick={() => {
						onShowElems(showElemsType);
						this.isSelected(showElemsType);
					}}>
					{showElems}
				</button>
			</li>
		);
	};

  render() {
    return (
      <ul className="filters">
				{this.makeListItem('All')}
        {this.makeListItem('Active')}
        {this.makeListItem('Completed')}
      </ul>
    );
  }
}
