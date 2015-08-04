/// <reference path="libraries/definitions/jquery.d.ts" />
/// <reference path="libraries/definitions/jQuery Plugins.d.ts" />
/// <reference path="typescript/AutoPlaceholder.ts" />
/// <reference path="typescript/NamedWidgets.ts" />

//import AutoPlaceholer = require("typescript/AutoPlaceholder");

$( ()=> {
    // Enable all the Bootstrap Switches
    $(".bsSwitch").bootstrapSwitch();
    console.log("LikeAG5 Initialized");

    var hooks = new LikeAG5.Hooks();
    var autoPlaceholder = new LikeAG5.AutoPlaceholder;

    autoPlaceholder.inject(hooks);

});



