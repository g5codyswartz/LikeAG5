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
            this.observerHooks = {};
            // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
            // create an observer instance
            this.observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    //console.log(mutation.type);
                    console.log(mutation);
                });
            });
        }
        Hooks.prototype.addObserver = function (target) {
            // select the target node
            //var target = document.querySelector('.ember-view>.page');
            // pass in the target node, as well as the observer options
            this.observer.observe(target, Hooks.observerConfig);
        };
        Hooks.prototype.removeObserver = function () {
            /* todo
                Find out if we can just overwrite the observer target with an empty function,
                if we can add multiple callbacks.
                Or if we need to disconnect the observer, clean our cache, and then reinitialize our observers
             */
        };
        Hooks.prototype.setjQueryBind = function (elSelector, eventName, callback) {
            // check if the element has been entered yet
            if (this.elHooks[elSelector] == undefined)
                this.elHooks[elSelector] = {};
            // check if event has been entered yet
            if (this.elHooks[elSelector][eventName] == undefined) {
                console.log("New Hook for Modal Visible: " + name);
                $(elSelector).bind(eventName, callback);
                this.elHooks[elSelector][eventName] = callback;
            }
            else
                return false;
            switch (hookType) {
                case 0 /* CMSEditorLoaded */:
                    break;
                case 1 /* ModalVisible */:
                    console.log("New Hook for Modal Visible: " + name);
                    $('#modal').bind('isVisible', callback);
                    break;
            }
        };
        Hooks.prototype.RemovejQueryBind = function (elSelector, eventName) {
            // check if the element has been entered and check if event has been entered
            if (this.elHooks[elSelector] == undefined || this.elHooks[elSelector][eventName] == undefined)
                return false;
            // remove the jquery bind and our cache
            $(elSelector).unbind(eventName, this.elHooks[elSelector][eventName]);
            delete this.elHooks[elSelector][eventName];
        };
        Hooks.observerConfig = { attributes: true, childList: true, characterData: true };
        return Hooks;
    })();
    LikeAG5.Hooks = Hooks;
})(LikeAG5 || (LikeAG5 = {}));
//# sourceMappingURL=Hooks.js.map