import React from 'react';
import { Placeholder } from 'semantic-ui-react';
import './typesPlaceholder.css';

export default () => (
	<div
		className="types-placeholder-container"
	>
		<Placeholder
			fluid={ true }
			className="types-placeholder"
		>
			<Placeholder.Image
				rectangular={ true }
			/>
		</Placeholder>
	</div>
);
