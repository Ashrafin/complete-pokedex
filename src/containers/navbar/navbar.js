import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search } from 'semantic-ui-react';
import PokemonList from '../../pokemonList';
import SearchResult from '../../components/searchResult/searchResult';
import checkDigits from '../../utility/checkDigits';
import capitalizeFirstLetter from '../../utility/capitalizeFirstLetter';
import './navbar.css';

const modifiedPokemonList = PokemonList.map((pokemon, index) => {
	return { title: pokemon, id: checkDigits(index + 1) }
});

const resultRenderer = ({ title, id }) => <SearchResult key={ id } title={ capitalizeFirstLetter(title.toLowerCase()) } />;

const Navbar = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [results, setResults] = useState([]);
	const [value, setValue] = useState("");

	const resetComponent = () => {
		setIsLoading(false);
		setResults([]);
		setValue("");
	};

	const handleSearchChange = event => {
		let currentVal = event.target.value;
		let filteredPokemon = modifiedPokemonList.filter((pokemonName) => {
			return pokemonName.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
		});

		setValue(currentVal);
		setIsLoading(true);
		setResults(filteredPokemon);

		setTimeout(() => {
			if (value.length < 1) return resetComponent;
			setIsLoading(false);
		}, 300);
	};

	const pokedexImg = "https://www.virtuadopt.com/images/content/pokedex-small.png";

	return (
		<Menu borderless fixed="top" className="navbar-container">
			<Menu.Item as={ Link } to="/" className="navbar-item">
				<img className="navbar-image" src={ pokedexImg } alt="logo" /> Pokedex
			</Menu.Item>
			<Menu.Item position="right">
				<Search
					aligned="left"
					loading={ isLoading }
					onResultSelect={ resetComponent }
					onSearchChange={ handleSearchChange }
					value={ value }
					results={ results }
					resultRenderer={ resultRenderer }
					className="navbar-search"
				/>
			</Menu.Item>
		</Menu>
	);
};

export default Navbar;
