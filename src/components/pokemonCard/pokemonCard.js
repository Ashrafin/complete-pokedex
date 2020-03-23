import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Image, Header } from 'semantic-ui-react';
import capitalizeFirstLetter from '../../utility/capitalizeFirstLetter';
import './pokemonCard.css';

export default props => {
	const pokeSpriteURL = "https://img.pokemondb.net/sprites/sun-moon/icon/";
	const imageExtention = ".png";
	const sprite = `${ pokeSpriteURL + props.name + imageExtention }`;

	return (
		<Grid.Row columns={ 1 } className="pokemon-card-row">
			<Grid.Column as={ Link } to={ `/${ capitalizeFirstLetter(props.name) }` } className="pokemon-card-container">
				<Header as="h5" className="pokemon-name">
					<Image inline size="big" src={ sprite } className="pokemon-image" />
					{ props.name }
				</Header>
				<Header as="h5" floated="right" className="pokemon-number">
					# { props.dexNum }
				</Header>
			</Grid.Column>
		</Grid.Row>
	);
};
