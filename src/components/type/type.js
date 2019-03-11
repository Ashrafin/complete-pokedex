import React from 'react';
import getClassFromType from '../../utility/types';
import './type.css';

export default (props) => {
	return (
		<div
			className="types-container"
		>
			<div
				className={ "type-container " + getClassFromType(props.typeName) }
			>
				<h4
					className="type-name"
				>
					{ props.typeName }
				</h4>
			</div>
		</div>
	);
};
