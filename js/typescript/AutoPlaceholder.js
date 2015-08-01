/// <reference path="./MultidimensionalStorage.ts" />
var LikeAG5;
(function (LikeAG5) {
    var AutoPlaceholder = (function () {
        function AutoPlaceholder() {
        }
        AutoPlaceholder.inject = function () {
            $('[placeholder^="{{"]').after(function () {
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
                $('[placeholder^="{{"]').each(function () {
                    $(this).val($(this).attr('placeholder'));
                });
            }
        };
        return AutoPlaceholder;
    })();
    LikeAG5.AutoPlaceholder = AutoPlaceholder;
})(LikeAG5 || (LikeAG5 = {}));
//# sourceMappingURL=AutoPlaceholder.js.map