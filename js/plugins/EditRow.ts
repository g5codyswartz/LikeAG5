/// <reference path="../libraries/definitions/jquery.d.ts" />
/// <reference path="../typescript/i_Injectable.ts" />
/// <reference path="../typescript/Hooks.ts" />

module LikeAG5 {
    export class EditRow implements Injectable {

        inject(hooks:Hooks) {

            console.log("Edit Row Injected");

            hooks.findElement('.builder iframe.ember-view', (e)=>{
                console.log("FOUND IFRAME", e);

                e.load(()=>{
                    console.log("Iframe DOM Ready");

                    console.log(e, e.contents(), $(".row", e.contents()));

                    $(".row", e.contents()).each((i,e)=>{
                        let el = $(e);
                        let dataId = $(el).data("id");
                        el.append(`<span>${dataId}</span>`);
                    });
                });

            });

        }
    }
}