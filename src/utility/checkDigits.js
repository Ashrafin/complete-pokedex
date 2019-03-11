// return the appropriate number of 0's based on the number
export default (number) => {
	if (number < 10) {
		let finalNum = "00" + number.toString();
		return finalNum;
	} else if (number > 9 && number <= 99) {
		let finalNum = "0" + number.toString();
		return finalNum;
	} else {
		let finalNum = number.toString();
		return finalNum;
	}
};
