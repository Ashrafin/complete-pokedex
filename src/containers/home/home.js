import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import axios from 'axios';
import PokemonPlaceholder from '../../components/pokemonPlaceholder/pokemonPlaceholder';
import PokemonCard from '../../components/pokemonCard/pokemonCard';
import checkDigits from '../../utility/checkDigits';
import './home.css';

// initial pokemon api url
const pokeApiURL = "https://pokeapi.co/api/v2/pokemon?offset=";
// how many pokemon to load at a time
const limit = "&limit=20";

class Home extends React.Component {
	componentWillMount() {
		// get the pokedex stored in localStorage
		const cachedPokedex = localStorage.getItem("pokedex", JSON.parse(localStorage.getItem("pokedex")));
		// get the fetchFrom stored in localStorage
		const cachedFrom = localStorage.getItem("fetchFrom");
		// if pokedex and fetchFrom exist in localStorage, pass the data from localStorage to the state
		// otherwise send an axios request to get the data
		if (cachedPokedex && cachedFrom) {
			const pokedex = JSON.parse(cachedPokedex);
			const fetchFrom = JSON.parse(cachedFrom);
			this.setState({ pokedex, fetchFrom });
		} else {
			// axios request to get the 20 pokemon
			axios({
				method: "GET",
				url: `${ pokeApiURL + this.state.fetchFrom + limit }`
			})
			.then(response => {
				this.setState({
					pokedex: response.data.results,
					fetchFrom: this.state.fetchFrom + 20
				});
			})
			.catch(error => {
				console.log(error);
			})
		}
	}

	componentDidMount() {
		// set timeout function to simulate loading the content
		setTimeout(() => {
			this.setState({ loadingPokemon: false });
		}, 3000);
	}

	state = {
		loadMore: false,
		loadingPokemon: true,
		simulateLoading: false,
		pokedex: [],
		fakeArr: [],
		fetchFrom: 0
	}

	// method to get the next 20 pokemon
	loadNextBatch = () => {
		// axios request to get the next 20 pokemon
		axios({
			method: "GET",
			url: `${ pokeApiURL + this.state.fetchFrom + limit }`
		})
		.then(response => {
			this.setState({
				loadMore: true,
				simulateLoading: true,
				fakeArr: response.data.results,
			});
			// set timeout function to update the pokedex array with the new pokemon's.
			// set timeout function to simulate loading the content
			setTimeout(() => {
				this.setState({
					loadMore: false,
					simulateLoading: false,
					pokedex: [...this.state.pokedex, ...response.data.results],
					fakeArr: [],
					fetchFrom: this.state.fetchFrom + 20
				});
				// save the current pokedex and current fetchFrom into localStorage
				localStorage.setItem("pokedex", JSON.stringify(this.state.pokedex));
				localStorage.setItem("fetchFrom", this.state.fetchFrom);
			}, 3000);
		})
		.catch(error => {
			console.log(error);
		})
	}

	render() {
		return (
			<Grid
				centered
				columns={ 1 }
				className="pokedex-container"
			>
				<Grid.Row
					columns={ 1 }
				>
					<Grid.Column
						largeScreen={ 6 }
						widescreen={ 4 }
						computer={ 6 }
						tablet={ 10 }
						mobile={ 16 }
					>

						{ this.state.pokedex
							? this.state.pokedex.map((pokemon, index) => {
									return	<React.Fragment
														key={ index }
													>
														{ this.state.loadingPokemon
															? <PokemonPlaceholder
																	key={ index }
																/>
															: <PokemonCard
																	name={ pokemon.name }
																	key={ index }
																	dexNum={ checkDigits(index + 1) }
																	history={ this.props.history }
																	match={ this.props.match }
																/>
														}
													</React.Fragment>
								})
							: null
						}

						{ this.state.fakeArr.map((item, index) => {
							return 	this.state.simulateLoading
											? <PokemonPlaceholder
													key={ index }
												/>
											: null
						}) }

						{ this.state.loadingPokemon
							? null
							: <Grid.Row
									columns={ 1 }
								>
								<Grid.Column
									className="load-more-container"
								>
									<Button
										loading={ this.state.loadMore }
										className="load-more-button"
										onClick={ this.loadNextBatch }
									>
										load more
								</Button>
								</Grid.Column>
							</Grid.Row>
						}

					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default Home;
