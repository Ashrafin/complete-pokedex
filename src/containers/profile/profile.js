import React from 'react';
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

// initial pokemon api url
const pokeApiURL = "https://pokeapi.co/api/v2/pokemon/";

class Profile extends React.Component {
	componentWillMount() {
		// axios request to get the current pokemon's data
		axios({
			method: "GET",
			url: `${ pokeApiURL + lowercaseFirstLetter(this.props.match.params.name) }`
		})
		.then(response => {
			this.setState({
				pokemonData: response.data
			});
		})
		.catch(error => {
			console.log(error);
		})
	}

	componentDidMount() {
		// set timeout function to simulate loading the content
		setTimeout(() => {
			this.setState({ loading: false });
		}, 3000);
	}

	componentDidUpdate(prevProps) {
		// check if the previously loaded pokemon's name is the same as the currently loaded pokemon's name
		// if they do not match then send a request to get the current pokemon's data
		const { params } = this.props.match;
		if (prevProps.match.params.name !== params.name) {
			this.setState({ loading: true });
			axios({
				method: "GET",
				url: `${ pokeApiURL + lowercaseFirstLetter(this.props.match.params.name) }`
			})
			.then(response => {
				this.setState({ pokemonData: response.data });
			})
			.catch(error => {
				console.log(error);
			})
			// set timeout function to end the loading state
			setTimeout(() => {
				this.setState({ loading: false });
			}, 3000);
		}
	}

	state = {
		pokemonData: null,
		loading: true
	}

	render() {
		// initial pokemon artwork url
		const pokemonArtURL = "https://img.pokemondb.net/artwork/";
		// pokemon artwork image extension
		const imageExtension = ".jpg";
		// final pokemon artwork url
		const artwork = `${ pokemonArtURL + lowercaseFirstLetter(this.props.match.params.name) + imageExtension }`;

		return (
			<Grid
				centered
				columns={ 1 }
				className="profile-container"
			>
				<Grid.Row
					columns={ 1 }
				>
					<Grid.Column
						largeScreen={ 7 }
						widescreen={ 5 }
						computer={ 7 }
						tablet={ 10 }
						mobile={ 16 }
						textAlign="center"
					>
						{ this.state.loading
							? <BreadcrumbPlaceholder />
							: <Breadcrumb
									size="small"
								>
									<Breadcrumb.Section
										as={ Link }
										to="/"
										className="profile-breadcrumbs"
									>
										Pokedex
									</Breadcrumb.Section>
									<Breadcrumb.Divider
										icon="right angle"
										className="breadcrumb-divider"
									/>
									<Breadcrumb.Section
										as={ Link }
										to={ `/${ capitalizeFirstLetter(this.state.pokemonData.name) }` }
										active={ true }
										className="profile-breadcrumbs"
									>
										{ capitalizeFirstLetter(this.state.pokemonData.name) }
									</Breadcrumb.Section>
								</Breadcrumb>
						}
						{ this.state.loading
							? <HeaderPlaceholder />
							: <Header
									as="h2"
									className="profile-header"
								>
									{ capitalizeFirstLetter(this.state.pokemonData.name) }
									<Header.Subheader
										className="profile-subheader"
									>
										# { checkDigits(this.state.pokemonData.id) }
									</Header.Subheader>
								</Header>
						}

						<Grid.Row>
							<Grid.Column>
								{ this.state.loading
									? <ImagesPlaceholder />
									: <React.Fragment>
											<Image
												src={ artwork }
												size="medium"
												inline={ true }
												className="profile-artwork"
											/>
											<Image.Group
												size="tiny"
												className="profile-sprite-group"
											>
												<Image
													src={ this.state.pokemonData.sprites.front_default }
												/>
												<Image
													src={ this.state.pokemonData.sprites.back_default }
												/>
												<Image
													src={ this.state.pokemonData.sprites.front_shiny }
												/>
												<Image
													src={ this.state.pokemonData.sprites.back_shiny }
												/>
											</Image.Group>
										</React.Fragment>
								}

								{ this.state.pokemonData !== null
									? this.state.pokemonData.types.map((type, index) => {
											return  <React.Fragment
																key={ index }
															>
																{ this.state.loading
																	? <TypesPlaceholder key={ index } />
																	: <PokemonType
																			typeName={ type.type.name }
																			key={ index }
																		/>
																}
											        </React.Fragment>
										})
									: null
								}

								{ this.state.pokemonData !== null
									? this.state.pokemonData.stats.map((stat, index) => {
										return 	<React.Fragment
															key={ index }
														>
															{ this.state.loading
																? <StatsPlaceholder />
																: <BaseStats
																		statName={ stat.stat.name }
																		baseStat={ stat.base_stat }
																		key={ index }
																	/>
															}
														</React.Fragment>
									})
									: null
								}

							</Grid.Column>
						</Grid.Row>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
};

export default Profile;
