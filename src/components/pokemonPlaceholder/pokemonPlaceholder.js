import React from 'react';
import { Grid, Placeholder } from 'semantic-ui-react';
import './pokemonPlaceholder.css';

export default () => (
	<Grid.Row
		columns={ 1 }
		className="pokemon-placeholder-row"
	>
		<Grid.Column
			className="pokemon-placeholder-container"
		>
			<Placeholder
				className="pokemon-placeholder-image-container"
			>
				<Placeholder.Image />
			</Placeholder>

			<Placeholder
				fluid
				className="pokemon-placeholder-name-container"
			>
				<Placeholder.Header>
					<Placeholder.Line
						length="very long"
					/>
				</Placeholder.Header>
			</Placeholder>

			<Placeholder
				fluid
				className="pokemon-placeholder-number-container"
			>
				<Placeholder.Header>
					<Placeholder.Line
						length="very long"
					/>
				</Placeholder.Header>
			</Placeholder>
		</Grid.Column>
	</Grid.Row>
);
