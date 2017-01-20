/// <reference path="../libraries/definitions/jquery.d.ts" />
/// <reference path="../libraries/definitions/jQuery Plugins.d.ts" />
/// <reference path="../typescript/ExportModalForm.ts" />
/// <reference path="../libraries/definitions/chrome.d.ts" />

$( ()=> {

	console.log("LikeAG5 Popup Initialized");

	// Enable all the Bootstrap Switches
	$(".bsSwitch").bootstrapSwitch();

	// Events
	/*$('exportModalForm').click(function(){
		console.log("TESTING");
		(new LikeAG5.ExportModalForm).callback();
	});*/

	var port = chrome.runtime.connect({name: "LikeAG5"});
	port.postMessage({joke: "Knock knock"});
	port.onMessage.addListener(function(msg:any) {
		console.log("popup msg");
		console.log(msg);
		if (msg.question == "Who's there?")
			port.postMessage({answer: "Madame"});
		else if (msg.question == "Madame who?")
			port.postMessage({answer: "Madame... Bovary"});
	});

});
