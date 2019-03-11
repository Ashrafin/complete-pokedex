import React from 'react';
import { Placeholder } from 'semantic-ui-react';
import './statsPlaceholder.css';

export default () => (
	<div
		className="stats-placeholder-container"
	>
		<div
			className="stats-placeholder-name-container"
		>
			<Placeholder
				fluid={ true }
			>
				<Placeholder.Line
					length="long"
				/>
			</Placeholder>
		</div>
		<div
			className="stats-placeholder-bar-container"
		>
			<Placeholder
				fluid={ true }
			>
				<Placeholder.Line
					length="full"
				/>
			</Placeholder>
		</div>
	</div>
);
