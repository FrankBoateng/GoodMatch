export class Matcher {
	constructor(name1, name2) {
		// get the name1 and name2 and remove non-alphabetic letters from both then turn them into sentence case
		this.name1 = this.cleanString(name1);
		this.name2 = this.cleanString(name2);
	}

	/**
	 * Cleans the string from all non alphabetic characters and returns it in Title Case
	 * It takes a string, removes all non-alphabetic characters, and capitalizes the first letter of each
	 * word.
	 * @param str - The string to be cleaned.
	 * @returns the string with all non-alphabetic characters removed and the first letter of each word
	 * capitalized.
	 */
	cleanString(str) {
		return str.replace(/[^a-z]/gi, "").replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}

	/**
	 * The function matches the given data letter per letter and return a string representation or pattern
	 * It takes two strings and returns a string of numbers that represent the number of times each
	 * character appears in the two strings
	 * @param str1 - "abc"
	 * @param str2 - "matches"
	 * @returns a string of numbers.
	 */
	match(str1, str2) {
		// Create two variables
		// One for storing the counts and the other for appending the pattern
		let pattern = [];
		let count = {};

		// Creating a new string and turning it into an array

		try {
			let newStringArray = (str1 + "matches" + str2)
				.toLowerCase()
				.split("");

			for (const element of newStringArray) {
				if (count[element]) {
					count[element] += 1;
				} else {
					count[element] = 1;
				}
			}

			pattern = Object.values(count);
			return pattern.join("");
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Reducer function to reduce the number to a 2 digit number
	 * It takes a number, splits it into an array of digits, then adds the digits together until there are
	 * only two digits left.
	 * @param numberPattern - The number pattern to be reduced.
	 * @returns the last two digits of the number.
	 */
	reduce(numberPattern) {
		let myArr = numberPattern.toString().split("").map(Number);
		let newArr = [];
		this.trim(myArr, newArr);

		while (newArr.length > 2) {
			myArr = newArr;
			newArr = [];
			this.trim(myArr, newArr);
		}

		if (newArr.length == 2) {
			var myStr = newArr.join("");
			myArr = myStr.toString().split("").map(Number);
			newArr = [];
			this.trim(myArr, newArr);
			return newArr.join("");
		}
	}

	/**
	 * Trim an array and sum the trimmed data into new array
	 * It takes an array and a temporary array as arguments, pushes the first and last elements of the
	 * array to the temporary array, pops and shifts the array, and if the array is greater than one, it
	 * calls itself with the array and temporary array as arguments, otherwise it pushes the last element
	 * of the array to the temporary array and returns the temporary array.
	 * @param arr - The array to be trimmed
	 * @param tempArr - This is the array that will be returned.
	 * @returns [3, 5, 7, 9, 10]
	 */
	trim(arr, tempArr) {
		tempArr.push(arr[0] + arr[arr.length - 1]);
		arr.pop();
		arr.shift();

		if (arr.length > 1) {
			this.trim(arr, tempArr);
		} else if (arr.length == 1) {
			tempArr.push(arr[0]);
		}

		return tempArr;
	}

	/**
	 * Generate a proper result string for
	 * It takes three parameters, name1, name2, and percentage. It then checks if the percentage is greater
	 * than or equal to 80. If it is, it returns a string that says name1 matches name2 percentage%, good
	 * match. If it isn't, it returns a string that says name1 matches name2 percentage%.
	 * @param name1 - The first name
	 * @param name2 - The name of the person you want to compare to.
	 * @param percentage - the percentage of the match
	 * @returns The result of the function is the string that is returned.
	 */
	/**
	 * It takes in two names and a percentage and returns an object with the names and percentage and a
	 * string that says if the match is good or not
	 * @param name1 - The first name
	 * @param name2 - "John"
	 * @param percentage - the percentage of the match
	 * @returns The resultObject is being returned.
	 */
	generateResut(name1, name2, percentage) {
		let resultObject = {};
		resultObject.name1 = name1;
		resultObject.name2 = name2;
		resultObject.percentage = percentage;
		let resultString = "";
		if (percentage >= 80) {
			resultString =
				name1 +
				" matches " +
				name2 +
				" " +
				percentage +
				"%, good match";
			resultObject.resultString = resultString;
		} else {
			resultString = name1 + " matches " + name2 + " " + percentage + "%";
			resultObject.resultString = resultString;
		}
		return resultObject;
	}

	// Getter
	get result() {
		return this.produceResult();
	}

	// Method
	produceResult() {
		// Combine them with 'matches with'
		// Match them then return a whole new worked string pattern
		const pattern = this.match(this.name1, this.name2);

		// Reduce pattern to percentage
		let final = parseInt(this.reduce(pattern));

		// Generate the resulted strings
		let resultObject = this.generateResut(this.name1, this.name2, final);
		return resultObject;
	}
}