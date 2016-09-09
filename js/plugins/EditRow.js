/// <reference path="../libraries/definitions/jquery.d.ts" />
/// <reference path="../typescript/i_Injectable.ts" />
/// <reference path="../typescript/Hooks.ts" />
var LikeAG5;
(function (LikeAG5) {
    var EditRow = (function () {
        function EditRow() {
        }
        EditRow.prototype.inject = function (hooks) {
            console.log("Edit Row Injected");
            hooks.findElement('.builder iframe.ember-view', function (e) {
                console.log("FOUND IFRAME", e);
                e.load(function () {
                    console.log("Iframe DOM Ready");
                    console.log(e, e.contents(), $(".row", e.contents()));
                    $(".row", e.contents()).each(function (i, e) {
                        var el = $(e);
                        var dataId = $(el).data("id");
                        el.append("<span>" + dataId + "</span>");
                    });
                });
            });
        };
        return EditRow;
    }());
    LikeAG5.EditRow = EditRow;
})(LikeAG5 || (LikeAG5 = {}));
//# sourceMappingURL=EditRow.js.map