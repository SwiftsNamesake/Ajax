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
		
		// window.location = e.toElement.href;

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

	var request = new XMLHttpRequest();

	request.onreadystatechange = function() {
		if (request.status !== 200) {
			console.error(request.status.toString() + " An error occurred during a request for " + path + ".");
		} else {
			console.log("Loaded " + path + ".");
			onReady(request); // Invoke callback
		}
	};
}


function reloadContents() {
	loadResource("contents.txt", function(request) { document.getElementById("scratchboard").innerHtml = request.response; });
}


function addListeners() {
	addReferenceHighlights();
	document.getElementById("scratch").addEventListener("click", reloadContents);
}


window.onload = function() {
	// Entry point
	console.log("%cPage has loaded.", "color: green;");
	addListeners();
};