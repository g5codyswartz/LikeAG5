
$(() => {

	console.log("LikeAG5 Background Initialized");

	chrome.runtime.onConnect.addListener(function (port) {
		console.log("background listener");
		console.log(port);
		console.assert(port.name == "LikeAG5");
		port.onMessage.addListener(function (msg: any) {

			console.log("background msg");
			console.log(msg);

			if (msg.joke == "Knock knock")
				port.postMessage({ question: "Who's there?" });
			else if (msg.answer == "Madame")
				port.postMessage({ question: "Madame who?" });
			else if (msg.answer == "Madame... Bovary")
				port.postMessage({ question: "I don't get it." });
		});
	});

});

