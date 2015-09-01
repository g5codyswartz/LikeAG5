/// <reference path="../libraries/definitions/jquery.d.ts" />
/// <reference path="./MultidimensionalStorage.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LikeAG5;
(function (LikeAG5) {
    var NamedWidgets = (function (_super) {
        __extends(NamedWidgets, _super);
        function NamedWidgets() {
            _super.apply(this, arguments);
        }
        NamedWidgets.inject = function () {
            // v1.0
            // Author: Cody Swartz
            /* Ideas:
             Too bad I cannot pull h-tags I could auto name them by those,
             or at least display them or take like a 10 character substring from them
             */
            /**
             float: right;
             height: 20px;
             padding: 0;
             */
            // $("<style type='text/css'> .redbold{ color:#f00; font-weight:bold;} </style>").appendTo("head");
            // maybe append a span with the name infront of the widget name styled with lower casing text
            // $($('.main-widgets li[id^=ember]')[1]).contents()[2].nodeValue = "Testing2"
            /* Options

             optDontAskRename(true/false);
             optAutoName(true/false);

             setName(id, name); // ie: setName(7798, "New Name");
             clearNames();
             renameAll();
             */
            // Lib we're using uses periods for convention
            var hostname = location.hostname.replace('.', '~');
            var pathname = location.pathname.replace('.', '~');
            var objPathPage = 'namedWidgets.' + hostname + "." + pathname;
            var contentStripeWidgets;
            $(function () {
                initjQuery();
                if (LikeAG5.MultidimensionalStorage.getObj(objPathPage) != undefined && LikeAG5.MultidimensionalStorage.getObj('options.namedWidgets.dontAskRename') !== true && !confirm("Continue with current names? Cancel to rename."))
                    clearNames();
                addCSS();
                addRenameButtons();
                mainNamedWidgets();
            });
            function initjQuery() {
                contentStripeWidgets = $('.main-widgets li[id^=ember].content-stripe');
            }
            function addRenameButtons() {
                $(contentStripeWidgets).each(function () {
                    var renameButton = $("<button class='btnRename'>rn</button>");
                    $(this).append(renameButton);
                    $(renameButton).click(function (e) {
                        e.stopPropagation();
                        var dataId = $(this).parent().attr('data-id');
                        setName(dataId, prompt("Choose a name for: " + dataId));
                    });
                });
            }
            function mainNamedWidgets() {
                var loop = 1;
                // Widgets existance - Main
                $(contentStripeWidgets).each(function () {
                    var dataId = $(this).attr('data-id');
                    var objPath = 'namedWidgets.' + hostname + "." + pathname + "." + dataId;
                    var widget = LikeAG5.MultidimensionalStorage.getObj(objPath);
                    // Widget existance
                    if (widget)
                        displayName(this, widget.name);
                    else {
                        displayName(this, "Setting");
                        //todo implement: empty yes, and, or null cancel
                        var named = (LikeAG5.MultidimensionalStorage.getObj('options.namedWidgets.autoName') !== true) ? prompt("Choose a name for: " + dataId) : loop;
                        LikeAG5.MultidimensionalStorage.setObj(objPath, { id: $(this).attr('id'), name: named });
                        displayName(this, named);
                    }
                    loop++;
                });
            }
            function displayName(el, name) {
                $(el).contents()[2].nodeValue = name + " [" + $(el).attr('data-id') + "]";
            }
            function setName(dataId, named) {
                var objPath = 'namedWidgets.' + hostname + "." + pathname + "." + dataId;
                var widget = $(".main-widgets li[id^=ember][data-id=" + dataId + "]");
                var widgetId = $(widget).attr('id');
                LikeAG5.MultidimensionalStorage.setObj(objPath, { id: widgetId, name: named });
                displayName(widget, named);
            }
            function clearNames() {
                var objPath = 'namedWidgets.' + hostname + "." + pathname;
                LikeAG5.MultidimensionalStorage.setObj(objPath, {});
                //localStorage.removeItem('namedWidgets');
            }
            function renameAll() {
                clearNames();
                mainNamedWidgets();
            }
            function optDontAskRename(bool) {
                LikeAG5.MultidimensionalStorage.setObj('options.namedWidgets.dontAskRename', bool);
            }
            function optAutoName(bool) {
                LikeAG5.MultidimensionalStorage.setObj('options.namedWidgets.autoName', bool);
            }
            function addCSS() {
                $("<style> .btnRename {" +
                    "padding: 0px 2px;" +
                    "background-color: #222;" +
                    "color: white;" +
                    "border: 0px solid #222;" +
                    "border-radius: 4px;" +
                    "width: 20px;" +
                    "height: 18px;" +
                    "letter-spacing: 1px;" +
                    "font-weight: bold;" +
                    "padding-left: 3px;" +
                    "} </style>").appendTo("head");
            }
            /* todo Ideas
             If the same client, ask if you want to load up another location - for locations
             that get cloned and have the same widget layouts.
             */
        };
        return NamedWidgets;
    })(LikeAG5.MultidimensionalStorage);
    LikeAG5.NamedWidgets = NamedWidgets;
})(LikeAG5 || (LikeAG5 = {}));
//# sourceMappingURL=NamedWidgets.js.map