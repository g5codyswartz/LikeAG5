var NamedWidgets = (function () {
    function NamedWidgets() {
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
        // http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
        /*Storage.prototype.setObject = function(key, value) {
         this.setItem(key, JSON.stringify(value));
         }

         Storage.prototype.getObject = function(key) {
         var value = this.getItem(key);
         return value && JSON.parse(value);
         }*/
        //https://github.com/iFind/html5MultidimensionalStorage
        /**
         *
         * MOVED TO: https://github.com/iFind/html5MultidimensionalStorage
         *
         * This methods extends the default HTML5 Storage object and add support
         * to set and get multidimensional data
         *
         * @example Storage.setObj('users.albums.sexPistols',"blah");
         * @example Storage.setObj('users.albums.sexPistols',{ sid : "My Way", nancy : "Bitch" });
         * @example Storage.setObj('users.albums.sexPistols.sid',"Other songs");
         *
         * @example Storage.getObj('users');
         * @example Storage.getObj('users.albums');
         * @example Storage.getObj('users.albums.sexPistols');
         * @example Storage.getObj('users.albums.sexPistols.sid');
         * @example Storage.getObj('users.albums.sexPistols.nancy');
         *
         * This is just a prototype and is not recommended to use at production apps
         * USE AT YOUR OWN RISK
         *
         * @author Klederson Bueno <klederson@klederson.com>
         * @author Gabor Zsoter <helo@zsitro.com>
         */
        //Add Storage support for objects
        Storage.prototype.__walker = function (path, o) {
            //Validate if path is an object otherwise returns false
            if (typeof path !== "object")
                return undefined;
            if (path.length === 0) {
                return o;
            }
            for (var i in path) {
                var prop = path[i];
                //Check if path step exists
                if (o.hasOwnProperty(prop)) {
                    var val = o[prop];
                    if (typeof val == 'object') {
                        path.splice(0, 1);
                        return this.__walker(path, val);
                    }
                    else {
                        return val;
                    }
                }
            }
        };
        Storage.prototype.setObj = function (key, value) {
            var path = key.split('.');
            //First level is always the localStorage key pair item
            var _key = path[0];
            var os = this.getItem(_key) !== null ? JSON.parse(this.getItem(_key)) : null; //general storage key pair element
            path.splice(0, 1);
            if (os === null) {
                os = {};
                this.setItem(_key, JSON.stringify(os));
            }
            var innerWalker = function (path, o) {
                //Validate if path is an object otherwise returns false
                if (typeof path !== "object")
                    return undefined;
                if (path.length == 1) {
                    o[path[0]] = value;
                    return o;
                }
                else if (path.length === 0) {
                    os = value;
                    return os;
                }
                var val = null;
                for (var i in path) {
                    var prop = path[i];
                    //Check if path step exists
                    if (o.hasOwnProperty(prop)) {
                        val = o[prop];
                        if (typeof val == 'object') {
                            path.splice(0, 1);
                            return innerWalker(path, val);
                        }
                    }
                    else {
                        //create depth
                        o[prop] = {};
                        val = o[prop];
                        path.splice(0, 1);
                        return innerWalker(path, val);
                    }
                }
            };
            innerWalker(path, os);
            this.setItem(_key, JSON.stringify(os));
        };
        Storage.prototype.getObj = function (key) {
            var keySplit = key.split('.');
            //First level is always the localStorage key pair item
            var _key = keySplit[0];
            var o = this.getItem(_key) ? JSON.parse(this.getItem(_key)) : null;
            if (o === null)
                return undefined;
            keySplit.splice(0, 1);
            return this.__walker(keySplit, o);
        };
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
            if (localStorage.getObj(objPathPage) != undefined && localStorage.getObj('options.namedWidgets.dontAskRename') !== true && !confirm("Continue with current names? Cancel to rename."))
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
                var widget = localStorage.getObj(objPath);
                // Widget existance
                if (widget)
                    displayName(this, widget.name);
                else {
                    displayName(this, "Setting");
                    //todo implement: empty yes, and, or null cancel
                    var named = (localStorage.getObj('options.namedWidgets.autoName') !== true) ? prompt("Choose a name for: " + dataId) : loop;
                    localStorage.setObj(objPath, { id: $(this).attr('id'), name: named });
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
            localStorage.setObj(objPath, { id: widgetId, name: named });
            displayName(widget, named);
        }
        function clearNames() {
            var objPath = 'namedWidgets.' + hostname + "." + pathname;
            localStorage.setObj(objPath, {});
            //localStorage.removeItem('namedWidgets');
        }
        function renameAll() {
            clearNames();
            mainNamedWidgets();
        }
        function optDontAskRename(bool) {
            localStorage.setObj('options.namedWidgets.dontAskRename', bool);
        }
        function optAutoName(bool) {
            localStorage.setObj('options.namedWidgets.autoName', bool);
        }
        function addCSS() {
            $("<style> .btnRename {" + "padding: 0px 2px;" + "background-color: #222;" + "color: white;" + "border: 0px solid #222;" + "border-radius: 4px;" + "width: 20px;" + "height: 18px;" + "letter-spacing: 1px;" + "font-weight: bold;" + "padding-left: 3px;" + "} </style>").appendTo("head");
        }
        /* todo Ideas
         If the same client, ask if you want to load up another location - for locations
         that get cloned and have the same widget layouts.
         */
    };
    return NamedWidgets;
})();
//# sourceMappingURL=main.js.map