import React from 'react';
import { Placeholder } from 'semantic-ui-react';
import './imagesPlaceholder.css';

export default () => (
	<React.Fragment>
		<Placeholder fluid={ true } className="images-placeholder-artwork">
			<Placeholder.Image square={ true } />
		</Placeholder>
		<div className="images-placeholder-sprites-container">
			<Placeholder fluid={ true } className="images-placeholder-sprite">
				<Placeholder.Image square={ true } />
			</Placeholder>
			<Placeholder fluid={ true } className="images-placeholder-sprite">
				<Placeholder.Image square={ true } />
			</Placeholder>
			<Placeholder fluid={ true } className="images-placeholder-sprite">
				<Placeholder.Image square={ true } />
			</Placeholder>
			<Placeholder fluid={ true } className="images-placeholder-sprite">
				<Placeholder.Image square={ true } />
			</Placeholder>
		</div>
	</React.Fragment>
);
