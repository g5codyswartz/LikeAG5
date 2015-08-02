/// <reference path="../libraries/definitions/jquery.d.ts" />
/// <reference path="./Injectable.ts" />
/// <reference path="./MultidimensionalStorage.ts" />
/// <reference path="./Hooks.ts" />

module LikeAG5 {
    export class AutoPlaceholder implements Injectable {

        inject(hooks: Hooks) {

            console.log("AutoPlaceholder Injected");

            hooks.setjQueryBind(HookType.ModalVisible, "AutoPlaceholder", function() {

                console.log("AutoPlaceholder Triggered");

                var liquidPlaceholders = $('[placeholder^="{{"]');

                liquidPlaceholders.after(function() {
                    var placeHolderVal = $(this).attr('placeholder');
                    return '<button class="autoPlacer" phVal="'+placeHolderVal+'">AutoPlace</button>';
                });

                $('.autoPlacer').click(function(e){
                    e.preventDefault(); // prevent form submission

                    var placeHolderVal = $(this).attr('phVal');
                    var neighbor = $(this).parent().children('[placeholder^="{{"]')[0];

                    $(neighbor).val(placeHolderVal);

                    // maybe double click for fill in? need timer that resets a counter attribute on the element
                    // get parent and then the placeholder within the parent
                    // if jQuery defaultly supported background-color I would use that and the jQuery animate


                });

                if (localStorage.getItem("forceAutoPlace") == "true")
                {
                    liquidPlaceholders.each(function(){
                        $(this).val($(this).attr('placeholder'));
                    });
                }

            });


        }
    }
}
