export default (type) => {
	switch (type) {
		case "grass":
			return "bg-grass";
		case "fire":
			return "bg-fire";
		case "water":
			return "bg-water";
		case "electric":
			return "bg-electric";
		case "rock":
			return "bg-rock";
		case "flying":
			return "bg-flying";
		case "bug":
			return "bg-bug";
		case "steel":
			return "bg-steel";
		case "psychic":
			return "bg-psychic";
		case "ground":
			return "bg-ground";
		case "dark":
			return "bg-dark";
		case "ghost":
			return "bg-ghost";
		case "dragon":
			return "bg-dragon";
		case "poison":
			return "bg-poison";
		case "fairy":
			return "bg-fairy";
		case "ice":
			return "bg-ice";
		case "fighting":
			return "bg-fighting";
		case "normal":
			return "bg-normal";
		default:
			return null;
	};
};
