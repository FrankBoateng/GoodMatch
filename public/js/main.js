$(document).ready(function () {
	// update DOM function

	/* A jQuery function that is called when the form is submitted. It takes the data from the form and
sends it to the server. */
	$("#form1").on("submit", function (e) {
		var dataString = $(this).serialize();

		// alert(dataString);
		// return false;

		respond(dataString);

		e.preventDefault();
	});

	/**
	 * The function `respond` takes a `dataString` as an argument and sends it to the server using an AJAX
	 * call
	 * @param dataString - the data that is sent to the server
	 * @returns The data is being returned as a string.
	 */
	function respond(dataString) {
		$.ajax({
			type: "POST",
			url: "http://localhost:5000/submit-form1",
			data: dataString,
			success: function (data) {
				$("#log-text1").html("<div id='response'></div>");
				$("#response")
					.html("<h4>Matching Success!</h4>")
					.append(data.result + " ")
					.hide()
					.fadeIn(1500, function () {
						$("#response").append(
							"<img id='checkmark' style='width: 20px;' src='images/success.png' />"
						);
					});
			},
		}).fail(function () {
			//do nothing ....
			console.log("failed...");
			return;
		});
	}

	/* Checking the file extension of the file that is being uploaded. */
	$("#file").on("change", function (e) {
		checkFile(this);
	});

	/**
	 * If the file extension is not in the array of valid extensions, then clear the file input box and
	 * alert the user
	 * @param sender - The file input element that triggered the event.
	 * @returns a boolean value.
	 */
	function checkFile(sender) {
		var validExts = new Array(".csv");
		var fileExt = sender.value;
		fileExt = fileExt.substring(fileExt.lastIndexOf("."));
		if (validExts.indexOf(fileExt) < 0) {
			document.getElementById("file").value = null;
			alert(
				"Invalid file selected, valid files are of " +
					validExts.toString() +
					" types."
			);
			return false;
		} else return true;
	}

	$("#form2").on("submit", function (e) {
		var formData = new FormData($(this)[0]);
		dispatch(formData);
		e.stopPropagation();
	});

	// Restrict entry to csv files and read content and send it the server as data
	/**
	 * The function is called when the user clicks the submit button. It sends the form data to the server
	 * and then displays the response from the server.
	 * @param formData - The data to be sent to the server.
	 * @returns The data is being returned as a string.
	 */
	function dispatch(formData) {
		$.ajax({
			type: "POST",
			url: "http://localhost:5000/submit-form2",
			data: formData,
			async: true,
			cache: false,
			contentType: "w-xxx-form-urlencoded",
			processData: false,
			success: function (data) {
				$("#log-text2").html("<div id='message'></div>");
				$("#response")
					.html("<h4>Reading and Matching Success!</h4>")
					.append(data.message + " ") // + dat Implement data.message to display that the result has successfully been written
					.hide()
					.fadeIn(1500, function () {
						$("#message").append(
							"<img id='checkmark' style='width: 20px;' src='images/success.png' />"
						);
					});
			},
		}).fail(function () {
			//do nothing ....
			console.log("failed...");
			return;
		});
	}
});