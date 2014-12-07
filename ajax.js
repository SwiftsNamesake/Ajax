/*
 * Ajax.js
 * Dynamic web page content, courtesy of Zeus' grandson
 *
 * Jonatan H Sundqvist
 * December 6 2014
 *
 * TODO | - Look into promises
 *        - Look into event.dataTransfer
 *        - Proper string formatting
 *        - Output HTML to console (?)
 *	
 * SPEC | - 
 *        -
 *
*/



function addReferenceHighlights () {
	// Adds callbacks to reference links which highlights the proper item
	// TODO: On hover

	var references = document.getElementsByClassName("notelink");
	var previous; // Don't you love closures?

	function highlight(e) {
		
		e.preventDefault();
		note = document.getElementById(e.toElement.href.slice(-1)); // TODO: Fix the slice arguments (this will break for multiple-digit numbers)
		
		window.location = e.toElement.href;

		// TODO: Add and remove classes properly
		if (previous !== undefined) {
			previous.className = "";
		}

		previous = note;
		
		note.className = "highlight"; // Add highlight to corresponding reference TODO: Trim space

		console.log(e.toElement.href);
		console.log(note);

	}

	for (var i = 0; i < references.length; i++) {
		references[i].addEventListener("click", highlight);
	}

}


function loadResource(path, onReady) {

	// Sends a request for the specified resource and invokes the supplied callback upon success.
	ajax({
		type: "GET",
		url: path,
		success: function(request) {
			console.log("Loaded " + path + ".");
			onReady(request); // Invoke callback
		},

		failure: function(request) {
			console.error(request.status.toString() + " An error occurred during a request for " + path + ".");
		}
	});

}


function loadStyles(path) {
	ajax({
		type: "GET",
		url: path,
		success: function(request) {
			links = document.getElementsByTagName("link");
			for (var i = 0; i < links.length; i++) {
				if (links[i].type === "text/css") {
					links[i].href = "";
				} else {
					console.log(links[i].type);
				}
			}

			document.getElementsByTagName("head")[0].innerHTML += ("<style>" + request.response + "</style>");

		},

		failure: function(request) {
			console.log(request.status.toString() + "Could not load stylesheet.");
		}
	});
}


function ajax(attributes) {
	// 
	
	var request = new XMLHttpRequest();
	request.open(attributes["type"], attributes["url"], true); // Asynchronous request

	request.onreadystatechange = function() {

		if (request.status !== 200) {
			attributes["failure"](request);
		} else {
			attributes["success"](request);
		}

	}

	request.send();

}


function reloadContents() {
	console.log("Reloading...");
	loadResource("contents.txt", function(request) { document.getElementById("scratchboard").innerHTML = request.response; });
}


function addListeners() {
	addReferenceHighlights();
	document.getElementById("scratch").addEventListener("click", reloadContents);
	document.getElementById("redress").addEventListener("click", function(e) { loadStyles("sample.css"); });
}


window.onload = function() {
	// Entry point
	console.log("%cPage has loaded.", "color: green;");
	addListeners();
};