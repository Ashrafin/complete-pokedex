// return bar color based on the name
export default (name) => {
	switch (name) {
		case "speed":
			return "yellow";
		case "special-defense":
			return "pink";
		case "special-attack":
			return "purple";
		case "defense":
			return "blue";
		case "attack":
			return "red";
		case "hp":
			return "green";
		default:
			return "grey";
	};
};
