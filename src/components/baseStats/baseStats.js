import React from 'react';
import { Grid, Header, Progress } from 'semantic-ui-react';
import getBarColor from '../../utility/barColor';
import './baseStats.css';

export default (props) => (
	<Grid.Row
		columns={ 1 }
	>
		<Grid.Column
			className="stat-container"
		>
			<Header
				as="h6"
				className="stat-name"
			>
				{ props.statName }
			</Header>
			<Progress
				size="tiny"
				color={ getBarColor(props.statName) }
				active={ true }
				value={ props.baseStat }
				total="160"
				className="stat-bar-container"
			/>
		</Grid.Column>
	</Grid.Row>
);
