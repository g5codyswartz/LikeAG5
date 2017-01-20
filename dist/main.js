/// <reference path="../libraries/definitions/jquery.d.ts" />
/// <reference path="../libraries/definitions/jQuery Plugins.d.ts" />
/// <reference path="../typescript/AutoPlaceholder.ts" />
/// <reference path="../typescript/NamedWidgets.ts" />
/// <reference path="../plugins/EditRow.ts" />
/// <reference path="../libraries/definitions/chrome.d.ts" />
//import AutoPlaceholer = require("typescript/AutoPlaceholder");
$(function () {
    console.log("LikeAG5 Initialized");
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
