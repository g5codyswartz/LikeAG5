/// <reference path="../libraries/definitions/jquery.d.ts" />

module LikeAG5 {

    export enum HookType {
        CMSEditorLoaded,
        ModalVisible
    }

    export class Hooks {

        private elHooks: { [elSelector: string] : { [eventName: string]: ()=>any } };
	    private observerHooks;
        private observer: MutationObserver;
        private static observerConfig = { attributes: true, childList: true, characterData: true };

        constructor() {
            this.elHooks = {};
	        this.observerHooks = {};

	        // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
	        // create an observer instance
	        this.observer = new MutationObserver(function(mutations) {
		        mutations.forEach(function(mutation) {
			        //console.log(mutation.type);
			        console.log(mutation);
		        });
	        });

        }

	    public addObserver(target: HTMLElement) {

		    // select the target node
		    //var target = document.querySelector('.ember-view>.page');

		    // pass in the target node, as well as the observer options
		    this.observer.observe(target, Hooks.observerConfig);

	    }

	    public removeObserver() {
		    /* todo
		        Find out if we can just overwrite the observer target with an empty function,
		        if we can add multiple callbacks.
		        Or if we need to disconnect the observer, clean our cache, and then reinitialize our observers
		     */
	    }

        public setjQueryBind(elSelector: string, eventName: string, callback: ()=>any) {

            // check if the element has been entered yet
            if (this.elHooks[elSelector] == undefined)
                this.elHooks[elSelector] = {};

            // check if event has been entered yet
            if (this.elHooks[elSelector][eventName] == undefined) {
	            console.log("New Hook for Modal Visible: "+name);
	            $(elSelector).bind(eventName, callback);

	            this.elHooks[elSelector][eventName] = callback;
            }
            else
                return false;


            switch(hookType)
            {
                case HookType.CMSEditorLoaded:



                    break;
                case HookType.ModalVisible:
                    console.log("New Hook for Modal Visible: "+name);
                    $('#modal').bind('isVisible', callback);
                    break;
            }
        }

        public RemovejQueryBind(elSelector: string, eventName: string) {
            // check if the element has been entered and check if event has been entered
            if (this.elHooks[elSelector] == undefined || this.elHooks[elSelector][eventName] == undefined)
                return false;

	        // remove the jquery bind and our cache
	        $(elSelector).unbind(eventName, this.elHooks[elSelector][eventName]);
            delete this.elHooks[elSelector][eventName];
        }

    }
}