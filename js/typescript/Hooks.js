/// <reference path="../libraries/definitions/jquery.d.ts" />
var LikeAG5;
(function (LikeAG5) {
    (function (HookType) {
        HookType[HookType["CMSEditorLoaded"] = 0] = "CMSEditorLoaded";
        HookType[HookType["ModalVisible"] = 1] = "ModalVisible";
    })(LikeAG5.HookType || (LikeAG5.HookType = {}));
    var HookType = LikeAG5.HookType;
    var Hooks = (function () {
        function Hooks() {
            this.elHooks = {};
            this.observers = {};
        }
        Hooks.prototype.addDOMMutationObserver = function (name, callback) {
            // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
            // create an observers instance
            this.observers[name] = new MutationObserver(callback);
        };
        Hooks.prototype.addObserverTarget = function (observerName, target) {
            // select the target node
            //var target = document.querySelector('.ember-view>.page');
            // pass in the target node, as well as the observers options
            this.observers[observerName].observe(target, Hooks.observerConfig);
        };
        Hooks.prototype.removeObserver = function () {
            /* todo
                Find out if we can just overwrite the observers target with an empty function,
                if we can add multiple callbacks.
                Or if we need to disconnect the observers, clean our cache, and then reinitialize our observers
             */
        };
        Hooks.prototype.setjQueryBind = function (elSelector, eventName, callback) {
            // check if the element has been entered yet
            if (this.elHooks[elSelector] == undefined)
                this.elHooks[elSelector] = {};
            // check if event has been entered yet
            if (this.elHooks[elSelector][eventName] == undefined) {
                console.log("New Hook for: $('" + elSelector + "') Event: " + eventName);
                $(elSelector).bind(eventName, callback);
                this.elHooks[elSelector][eventName] = callback;
            }
            else
                return false;
            return true;
        };
        Hooks.prototype.RemovejQueryBind = function (elSelector, eventName) {
            // check if the element and event has been entered
            if (this.elHooks[elSelector] == undefined || this.elHooks[elSelector][eventName] == undefined)
                return false;
            // remove the jquery bind and our cache
            $(elSelector).unbind(eventName, this.elHooks[elSelector][eventName]);
            delete this.elHooks[elSelector][eventName];
            return true;
        };
        // 120 ticks @ 250ms = 30 seconds
        Hooks.prototype.findElement = function (elSelector, callback, tickSpeed, tickCycleTimeout) {
            // Pass this to anon functions: http://thomasdavis.github.io/tutorial/anonymous-functions.html
            if (tickSpeed === void 0) { tickSpeed = 250; }
            if (tickCycleTimeout === void 0) { tickCycleTimeout = 120; }
            var select = $(elSelector);
            console.log(select);
            console.log(select.length);
            var i = 0;
            // maybe a while: not found and under tick
            // nevermind that breaks the recurring calling + delay
            if (select.length) {
                console.log("FOUND! :D");
                callback();
            }
            else {
                console.log("NOT FOUND :(");
                setTimeout((function (scope) {
                    if (i < tickCycleTimeout)
                        scope.findElement(elSelector, callback, tickSpeed, tickCycleTimeout);
                    i++;
                    console.log("Trying to find: '" + elSelector + "' " + i + "/" + tickCycleTimeout + " @ " + tickSpeed + "ms Time Left: " + ((tickSpeed * i) / 1000) + "/" + ((tickSpeed * tickCycleTimeout) / 1000));
                })(this), tickSpeed);
            }
        };
        Hooks.observerConfig = { attributes: true, childList: true, characterData: true };
        return Hooks;
    })();
    LikeAG5.Hooks = Hooks;
})(LikeAG5 || (LikeAG5 = {}));
//# sourceMappingURL=Hooks.js.map