/// <reference path="../libraries/definitions/jquery.d.ts" />
/// <reference path="./Injectable.ts" />
/// <reference path="./MultidimensionalStorage.ts" />
/// <reference path="./Hooks.ts" />
var LikeAG5;
(function (LikeAG5) {
    var AutoPlaceholder = (function () {
        function AutoPlaceholder() {
        }
        AutoPlaceholder.prototype.inject = function (hooks) {
            console.log("AutoPlaceholder Injected");
            hooks.addDOMMutationObserver('autoPlaceholder', domMutationCallback);
            // todo need to make sure that the targetWatch exists first
            var targetWatch = document.querySelector('.ember-view>.page');
            hooks.addObserverTarget('autoPlaceholder', targetWatch);
            function domMutationCallback() {
                console.log("AutoPlaceholder DOM Mutation Callback triggered");
                // todo Add logic to determine What DOM mutation triggers the hooks.setjQueryBind to be set
                /*function(mutations) {

                 mutations.forEach(function(mutation) {
                 //console.log(mutation.type);
                 console.log(mutation);
                 });
                 }*/
                hooks.setjQueryBind('#modal', 'isVisible', function () {
                    console.log("AutoPlaceholder Modal Is Visible Triggered");
                    var liquidPlaceholders = $('[placeholder^="{{"]');
                    liquidPlaceholders.after(function () {
                        var placeHolderVal = $(this).attr('placeholder');
                        return '<button class="autoPlacer" phVal="' + placeHolderVal + '">AutoPlace</button>';
                    });
                    $('.autoPlacer').click(function (e) {
                        e.preventDefault(); // prevent form submission
                        var placeHolderVal = $(this).attr('phVal');
                        var neighbor = $(this).parent().children('[placeholder^="{{"]')[0];
                        $(neighbor).val(placeHolderVal);
                        // maybe double click for fill in? need timer that resets a counter attribute on the element
                        // get parent and then the placeholder within the parent
                        // if jQuery defaultly supported background-color I would use that and the jQuery animate
                    });
                    if (localStorage.getItem("forceAutoPlace") == "true") {
                        liquidPlaceholders.each(function () {
                            $(this).val($(this).attr('placeholder'));
                        });
                    }
                });
            }
        };
        return AutoPlaceholder;
    })();
    LikeAG5.AutoPlaceholder = AutoPlaceholder;
})(LikeAG5 || (LikeAG5 = {}));
//# sourceMappingURL=AutoPlaceholder.js.map