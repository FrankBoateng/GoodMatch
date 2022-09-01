import express from "express"; // Import the express dependency
const app = express(); //Instantiate an express app, the main work horse of this server
const port = 5000; // Save the port number where your server will be listening
import { router } from "./routes.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the app's view engine to ejs
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public/"));

//Routes
app.use(router); //http://127.0.0.1:5000/

/* Listening for any attempts from a client to connect at port: {port} */
app.listen(process.env.PORT || port, () => {
	console.log(
		`Now listening on port ${port} \n http://localhost:${
			process.env.PORT || port
		}/`
	);
});