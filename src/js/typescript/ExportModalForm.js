/// <reference path="../libraries/definitions/jquery.d.ts" />
/// <reference path="./i_Callable.ts" />
/// <reference path="./MultidimensionalStorage.ts" />
/// <reference path="../libraries/definitions/chrome.d.ts" />
/// <reference path="../libraries/definitions/my chrome.d.ts" />
var LikeAG5;
(function (LikeAG5) {
    var ExportModalForm = (function () {
        function ExportModalForm() {
        }
        ExportModalForm.prototype.callback = function () {
            var _this = this;
            console.log("TEST2");
            var modal = $("#modal");
            var modalName = $("#myModalLabel").text();
            var inputs = $("input", modal);
            var dump = {
                "modalName": modalName,
                "inputs": []
            };
            inputs.each(function () {
                dump["inputs"].push($(_this).val());
            });
            copy(JSON.stringify(dump));
        };
        return ExportModalForm;
    }());
    LikeAG5.ExportModalForm = ExportModalForm;
})(LikeAG5 || (LikeAG5 = {}));
//# sourceMappingURL=ExportModalForm.js.map