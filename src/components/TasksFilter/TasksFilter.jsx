import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TasksFilter.css';

const TasksFilter = ({ onShowElems }) => {
	const [ selectedElems, setSelectedElems ] = useState('all');

  const isSelected = showElemsType => setSelectedElems(showElemsType);
	
	const makeListItem = (showElems) => {
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
						isSelected(showElemsType);
					}}>
					{showElems}
				</button>
			</li>
		);
	};

	return (
		<ul className="filters">
			{makeListItem('All')}
			{makeListItem('Active')}
			{makeListItem('Completed')}
		</ul>
	);
};

TasksFilter.propTypes = {
	onShowElems: PropTypes.func.isRequired,
};

export default TasksFilter;
