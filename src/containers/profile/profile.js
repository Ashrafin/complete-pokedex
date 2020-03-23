import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Breadcrumb, Header, Image } from 'semantic-ui-react';
import axios from 'axios';
import BreadcrumbPlaceholder from '../../components/breadcrumbPlaceholder/breadcrumbPlaceholder';
import HeaderPlaceholder from '../../components/headerPlaceholder/headerPlaceholder';
import ImagesPlaceholder from '../../components/imagesPlaceholder/imagesPlaceholder';
import TypesPlaceholder from '../../components/typesPlaceholder/typesPlaceholder';
import StatsPlaceholder from '../../components/statsPlaceholder/statsPlaceholder';
import PokemonType from '../../components/type/type';
import BaseStats from '../../components/baseStats/baseStats';
import lowercaseFirstLetter from '../../utility/lowercaseFirstLetter';
import capitalizeFirstLetter from '../../utility/capitalizeFirstLetter';
import checkDigits from '../../utility/checkDigits';
import './profile.css';

const pokeApiURL = "https://pokeapi.co/api/v2/pokemon/";

const Profile = props => {
	const [pokemonData, setPokemonData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchPokemonData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setLoading(true);
		fetchPokemonData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props]);

	const fetchPokemonData = async () => {
		const response = await axios(`${ pokeApiURL + lowercaseFirstLetter(props.match.params.name) }`);
		setPokemonData(response.data);

		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};

	const pokemonArtURL = "https://img.pokemondb.net/artwork/";
	const imageExtension = ".jpg";
	const artwork = `${ pokemonArtURL + lowercaseFirstLetter(props.match.params.name) + imageExtension }`;

	return (
		<Grid centered columns={ 1 } className="profile-container">
			<Grid.Row columns={ 1 }>
				<Grid.Column largeScreen={ 7 } widescreen={ 5 } computer={ 7 } tablet={ 10 } mobile={ 16 } textAlign="center">
					{loading
						? <BreadcrumbPlaceholder />
						: <Breadcrumb size="small">
								<Breadcrumb.Section as={ Link } to="/" className="profile-breadcrumbs">
									Pokedex
								</Breadcrumb.Section>
								<Breadcrumb.Divider icon="right angle" className="breadcrumb-divider" />
								<Breadcrumb.Section as={ Link } to={ `/${ capitalizeFirstLetter(pokemonData.name) }` } active={ true } className="profile-breadcrumbs">
									{ capitalizeFirstLetter(pokemonData.name) }
								</Breadcrumb.Section>
							</Breadcrumb>
					}

					{loading
						? <HeaderPlaceholder />
						: <Header as="h2" className="profile-header">
								{ capitalizeFirstLetter(pokemonData.name) }
								<Header.Subheader className="profile-subheader">
									# { checkDigits(pokemonData.id) }
								</Header.Subheader>
							</Header>
					}

					<Grid.Row>
						<Grid.Column>
							{loading
								? <ImagesPlaceholder />
								: <>
										<Image src={ artwork } size="medium" inline={ true } className="profile-artwork" />
										<Image.Group size="tiny" className="profile-sprite-group">
											<Image src={ pokemonData.sprites.front_default } />
											<Image src={ pokemonData.sprites.back_default } />
											<Image src={ pokemonData.sprites.front_shiny } />
											<Image src={ pokemonData.sprites.back_shiny } />
										</Image.Group>
									</>
							}

							{pokemonData !== null
								? pokemonData.types.map((type, index) => (
										<React.Fragment key={ index } >
											{loading
												? <TypesPlaceholder key={ index } />
												: <PokemonType typeName={ type.type.name } key={ index } />
											}
										</React.Fragment>
									))
								: null
							}

							{pokemonData !== null
								? pokemonData.stats.map((stat, index) => (
										<React.Fragment key={ index }>
											{loading
												? <StatsPlaceholder />
												: <BaseStats statName={ stat.stat.name } baseStat={ stat.base_stat } key={ index } />
											}
										</React.Fragment>
									))
								: null
							}
						</Grid.Column>
					</Grid.Row>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default Profile;
