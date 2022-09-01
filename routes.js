import express from "express";
export var router = express.Router();
import fs from "fs";

import csv from "csvtojson";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import { Matcher } from "./util.js";

// Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log("Time: ", Date.now());
	next();
});

/* A middleware that parses the body of the request. */
router.use(
	express.urlencoded({
		extended: true,
	})
);

/* A route that responds to client's request. */
router.get("/", (req, res) => {
	//get requests to the root ("/") will route here
	res.render("index");
});

/* A route that responds to client's request. */
router.post("/submit-form1", (req, res) => {
	try {
		const name1 = req.body.input1;
		const name2 = req.body.input2;

		const matcher = new Matcher(name1, name2);

		res.render("index", function (err, html) {
			res.send({ result: matcher.result.resultString });
		});
	} catch (error) {
		console.log(error);
	}

	res.end();
});

router.post("/submit-form2", upload.single("file"), async (req, res) => {
	// List the result from the highest percentage to the lowest. Ie. order by percentage descending
	// If multiple results are the same, order them alphabetically.

	try {
		const dataArray = await csv({ noheader: true }).fromString(
			req.file.buffer.toString()
		);

		if (dataArray.length != 0) {
			let males = dataArray.filter(function (item) {
					return item.field2 == "m";
				}),
				keys = ["field1"],
				uniqueMales = [
					...new Set(
						males.flatMap((item) => keys.map((k) => item[k]))
					),
				];

			let females = dataArray.filter((item) => item.field2 == "f"),
				uniqueFemales = [
					...new Set(
						females.flatMap((item) => keys.map((k) => item[k]))
					),
				];

			// Run the good match program for every entry in the first set against every entry in the second set. Store the results
			let resultList = goodmatch(uniqueMales, uniqueFemales);
			// Print the results in a textfile called output.txt
			write(resultList);
			// await new Pokemon({
			//   national_number: nationalNumber,
			//   image: image,
			//   name: name,
			// }).save();

			// }
		}

		// res.json({ result: result });
		// res.render("index", function (err, html) {
		// 	res.send({ result: matcher.result });
		// });

		res.status(200).send("Uploaded successfully!");
	} catch {
		res.status(400).send(new Error("Error"));
	}

	res.end();
});

/**
 * It takes two arrays of strings, and returns an array of objects, each object containing a string and
 * a percentage
 * @param arr1 - ["hello", "world"]
 * @param arr2 - ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q",
 * "R", "S", "T",
 * @returns An array of objects.
 */
function goodmatch(arr1, arr2) {
	let resultList = [];
	try {
		arr1.forEach((k) => {
			arr2.forEach((i) => {
				const matcher = new Matcher(k, i);
				resultList.push(matcher.result);
			});
		});
		return resultList.sort((a, b) =>
			a.percentage > b.percentage
				? -1
				: a.percentage === b.percentage
				? a.resultString > b.resultString
					? 1
					: -1
				: 1
		);
	} catch (error) {
		console.log(error);
	}
}

function write(resultList) {
	let data = [];

	try {
		resultList.forEach((k) => {
			data.push(k.resultString + "\n");
		});
		fs.writeFileSync("output.txt", data.toString());
		console.log("File written successfully!");
	} catch (error) {
		console.log(error);
	}
}