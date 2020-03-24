import React, { useState, useEffect } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import axios from 'axios';
import PokemonPlaceholder from '../../components/pokemonPlaceholder/pokemonPlaceholder';
import PokemonCard from '../../components/pokemonCard/pokemonCard';
import checkDigits from '../../utility/checkDigits';
import './home.css';

const pokeApiURL = "https://pokeapi.co/api/v2/pokemon?offset=";
const limit = "&limit=20";

const Home = props => {
	const [loadMore, setLoadMore] = useState(false);
	const [loadingPokemon, setLoadingPokemon] = useState(true);
	const [simulateLoading, setSimulateLoading] = useState(false);
	const [pokedex, setPokedex] = useState([]);
	const [fakeArr, setFakeArr] = useState([]);
	const [fetchFrom, setFetchFrom] = useState(0);

	useEffect(() => {
		const cachedPokedex = localStorage.getItem("pokedex", JSON.parse(localStorage.getItem("pokedex")));
		const cachedFrom = localStorage.getItem("fetchFrom");

		if (cachedPokedex !== null && cachedFrom !== null) {
			const pokeData = JSON.parse(cachedPokedex);
			setPokedex(pokeData);
			setFetchFrom(+cachedFrom);
		} else {
			initialFetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setLoadingPokemon(false);
		}, 1000);
	}, [fetchFrom]);

	useEffect(() => {
		setTimeout(() => {
			localStorage.setItem("pokedex", JSON.stringify(pokedex));
			localStorage.setItem("fetchFrom", fetchFrom);
		}, 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pokedex, fetchFrom]);

	const loadNextBatch = () => {
		fetchData();
	};

	const initialFetchData = async () => {
		const response = await axios(`${ pokeApiURL + fetchFrom + limit }`);
		setPokedex(response.data.results);
		setFetchFrom(fetchFrom + 20);
	};

	const fetchData = async () => {
		const response = await axios(`${ pokeApiURL + fetchFrom + limit }`);
		setLoadMore(true);
		setSimulateLoading(true);
		setFakeArr(response.data.results);

		const newFetchFrom = fetchFrom + 20;

		setTimeout(() => {
			setLoadMore(false);
			setSimulateLoading(false);
			setPokedex([...pokedex, ...response.data.results]);
			setFetchFrom(newFetchFrom);
			setFakeArr([]);
		}, 1000);
	};

	return (
		<Grid centered columns={ 1 } className="pokedex-container">
			<Grid.Row columns={ 1 }>
				<Grid.Column largeScreen={ 6 } widescreen={ 4 } computer={ 6 } tablet={ 10 } mobile={ 16 }>
					{pokedex
						? pokedex.map((pokemon, index) => {
							return <React.Fragment key={ index }>
								{loadingPokemon
									? <PokemonPlaceholder key={ index } />
									: <PokemonCard
											name={ pokemon.name }
											key={ index }
											dexNum={ checkDigits(index + 1) }
											history={ props.location.history }
											match={ props.location.match }
										/>
								}
							</React.Fragment>
						})
						: null
					}

					{fakeArr.map((item, index) => {
						return simulateLoading
							? <PokemonPlaceholder key={ index } />
							: null
					})}

					{loadingPokemon
						? null
						: <Grid.Row columns={ 1 }>
								<Grid.Column className="load-more-container">
									<Button loading={ loadMore } onClick={ loadNextBatch } disabled={ loadMore } className="load-more-button">
										load more
									</Button>
								</Grid.Column>
							</Grid.Row>
					}
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default Home;
