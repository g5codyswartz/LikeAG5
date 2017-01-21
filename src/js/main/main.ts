
import { sayHello } from "../plugins/Greet";

$(() => {

	console.log("LikeAG5 Initialized");
	console.log(sayHello("AYeeee"));
	//var hooks = new LikeAG5.Hooks();
	//var autoPlaceholder = new LikeAG5.AutoPlaceholder;
	//var editRow = new LikeAG5.EditRow;

	// crashes chrome currently
	//autoPlaceholder.inject(hooks);
	//editRow.inject(hooks);

	/*var port = chrome.runtime.connect({name: "LikeAG5"});
	port.postMessage({joke: "Knock knock"});
	port.onMessage.addListener(function(msg:any) {
		console.log("main msg");
		console.log(msg);
		if (msg.question == "Who's there?")
			port.postMessage({answer: "Madame"});
		else if (msg.question == "Madame who?")
			port.postMessage({answer: "Madame... Bovary"});
	});*/

});



