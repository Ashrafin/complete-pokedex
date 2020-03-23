import React from 'react';
import { Link } from 'react-router-dom';
import { Label } from 'semantic-ui-react';
import './searchResult.css';

export default props => (
	<Label as={ Link } to={ `/${ props.title }` } className="pokemon-label">
		{	props.title }
	</Label>
);
