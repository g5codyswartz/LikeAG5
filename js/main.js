/// <reference path="libraries/definitions/jquery.d.ts" />
/// <reference path="typescript/AutoPlaceholder.ts" />
/// <reference path="typescript/NamedWidgets.ts" />
//import AutoPlaceholer = require("typescript/AutoPlaceholder");
$(function () {
    // Enable all the Bootstrap Switches
    //$(".bsSwitch").bootstrapSwitch();
    console.log("LikeAG5 Initialized");
    var hooks = new LikeAG5.Hooks();
    var autoPlaceholder = new LikeAG5.AutoPlaceholder;
    autoPlaceholder.inject(hooks);
});
//# sourceMappingURL=main.js.map