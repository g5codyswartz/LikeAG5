
module LikeAG5 {
    export class EditRow implements Injectable {

        inject(hooks:Hooks) {

            console.log("Edit Row Injected");

            hooks.cmsPreviewReady((e)=>{
                $(".row", e.contents()).each((i,e)=>{
                    let el = $(e);
                    let dataId = $(el).data("id");
                    el.append(`<span>${dataId}</span>`);
                });
            });
        }
    }
}