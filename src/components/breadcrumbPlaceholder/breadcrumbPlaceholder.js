import React from 'react';
import { Placeholder } from 'semantic-ui-react';
import './breadcrumbPlaceholder.css';

export default () => (
	<Placeholder
		fluid={ true }
		className="breadcrumb-placeholder"
	>
		<Placeholder.Line
			length="full"
		/>
	</Placeholder>
);
