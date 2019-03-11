import React from 'react';
import { Placeholder } from 'semantic-ui-react';
import './headerPlaceholder.css';

export default () => (
	<React.Fragment>
		<Placeholder
			fluid={ true }
			className="header-placeholder-1"
		>
			<Placeholder.Line
				length="full"
			/>
		</Placeholder>
		<Placeholder
			fluid={ true }
			className="header-placeholder-2"
		>
			<Placeholder.Line
				length="full"
			/>
		</Placeholder>
	</React.Fragment>
);
