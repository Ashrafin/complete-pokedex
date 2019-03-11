import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search } from 'semantic-ui-react';
import PokemonList from '../../pokemonList';
import SearchResult from '../../components/searchResult/searchResult';
import checkDigits from '../../utility/checkDigits';
import capitalizeFirstLetter from '../../utility/capitalizeFirstLetter';
import './navbar.css';

// modify the pokemon list and have each entry changed to an object with key value pairs
const modifiedPokemonList = PokemonList.map((pokemon, index) => {
	return { title: pokemon, id: checkDigits(index + 1) }
});

// custom render component
const resultRenderer = ({ title, id }) => <SearchResult key={ id } title={ capitalizeFirstLetter(title.toLowerCase()) } />;

class Navbar extends React.Component {
	state = {
		isLoading: false,
		results: [],
		value: ""
	}

	// method to set the state to its default values
	resetComponent = () => this.setState({ isLoading: false, results: [], value: "" });

	// method to handle search input change
	handleSearchChange = (event) => {
		// current value in the search input
		let currentVal = event.target.value;
		// filter pokemons based on what the value is in the search input
		let filteredPokemon = modifiedPokemonList.filter((pokemonName) => {
			return pokemonName.title.toLowerCase().indexOf(this.state.value.toLowerCase()) !== -1;
		});

		this.setState({
			isLoading: true,
			value: currentVal,
			results: filteredPokemon
		});

		// timeout function to update the loading state and reset the state if the search input is empty
		setTimeout(() => {
			if (this.state.value.length < 1) return this.resetComponent();
			this.setState({
				isLoading: false
			});
		}, 300);
	}

	render() {
		// pokedex logo
		const pokedexImg = "https://www.virtuadopt.com/images/content/pokedex-small.png";

		return (
			<Menu
				borderless
				fixed="top"
				className="navbar-container"
			>
				<Menu.Item
					as={ Link }
					to="/"
					className="navbar-item"
				>
					<img className="navbar-image" src={ pokedexImg } alt="logo" /> Pokedex
        </Menu.Item>
				<Menu.Item
					position="right"
				>
					<Search
						aligned="left"
						loading={ this.state.isLoading }
						onResultSelect={ this.resetComponent }
						onSearchChange={ this.handleSearchChange }
						value={ this.state.value }
						results={ this.state.results }
						resultRenderer={ resultRenderer }
						className="navbar-search"
					/>
				</Menu.Item>
			</Menu>
		);
	}
}

export default Navbar;
