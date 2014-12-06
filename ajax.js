/*
 * Ajax.js
 * Dynamic web page content, courtesy of Zeus' grandson
 *
 * Jonatan H Sundqvist
 * December 6 2014
 *
 * TODO | - Look into promises
 *        - Look into event.dataTransfer
 *	
 * SPEC | - 
 *        -
 *
*/



function addReferenceHighlights () {
	// Adds callbacks to reference links which highlights the proper item
	// TODO: On hover

	var references = document.getElementsByClassName("notelink");
	var previous;

	function higlight(e) {
		e.preventDefault();
		// window.location = e.toElement.href;

		note = document.getElementById(e.toElement.href.slice(-1)); // TODO: Fix the slice arguments (this will break for multiple-digit numbers)
		note.className = "highlight"; // Add highlight to corresponding reference TODO: Trim space

		console.log(e.toElement.href);
		console.log(note);
	}

	for (var i = 0; i < references.length; i++) {
		references[i].addEventListener("click", higlight)
	}

}


window.onload = function() {
	// Entry point
	console.log("Page has loaded.");
	addReferenceHighlights();
	console.log()
};