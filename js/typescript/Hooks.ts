/// <reference path="../libraries/definitions/jquery.d.ts" />

module LikeAG5 {

    export enum HookType {
        CMSEditorLoaded,
        ModalVisible
    }

    export class Hooks {

        private elHooks: { [elSelector: string] : { [eventName: string]: ()=>any } };
        private observers: { [name: string]: MutationObserver};
        private static observerConfig = { attributes: true, childList: true, characterData: true };

        constructor() {
            this.elHooks = {};
	        this.observers = {};

        }

	    public addDOMMutationObserver(name: string, callback: (mutations)=>any) {

		    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
		    // create an observers instance
		    this.observers[name] = new MutationObserver(callback);
	    }

	    public addObserverTarget(observerName: string, target: HTMLElement|Element) {
		    // select the target node
		    //var target = document.querySelector('.ember-view>.page');

		    // pass in the target node, as well as the observers options
		    this.observers[observerName].observe(target, Hooks.observerConfig);
	    }

	    public removeObserver() {
		    /* todo
		        Find out if we can just overwrite the observers target with an empty function,
		        if we can add multiple callbacks.
		        Or if we need to disconnect the observers, clean our cache, and then reinitialize our observers
		     */
	    }

        public setjQueryBind(elSelector: string, eventName: string, callback: ()=>any) {

            // check if the element has been entered yet
            if (this.elHooks[elSelector] == undefined)
                this.elHooks[elSelector] = {};

            // check if event has been entered yet
            if (this.elHooks[elSelector][eventName] == undefined) {
	            console.log("New Hook for: $('"+elSelector+"') Event: "+eventName);
	            $(elSelector).bind(eventName, callback);

	            this.elHooks[elSelector][eventName] = callback;
            }
            else
                return false;

	        return true;
        }

        public RemovejQueryBind(elSelector: string, eventName: string) {
            // check if the element and event has been entered
            if (this.elHooks[elSelector] == undefined || this.elHooks[elSelector][eventName] == undefined)
                return false;

	        // remove the jquery bind and our cache
	        $(elSelector).unbind(eventName, this.elHooks[elSelector][eventName]);
            delete this.elHooks[elSelector][eventName];

	        return true;
        }

	    // 120 ticks @ 250ms = 30 seconds
        public findElement(elSelector: string, callback: (el)=>any, tickSpeed = 500, tickCycleTimeout = 10, i = 0) {

            // Lol this was creating a self executing function that ignored the timer, thus killing the tab
	        // Pass this to anon functions: http://thomasdavis.github.io/tutorial/anonymous-functions.html

            var select = $(elSelector);

            if (select.length > 0)
            {
                console.log("FOUND! :D", select);
                callback(select);
            }
            else if (i < tickCycleTimeout)
            {
                i++;

                console.log("NOT FOUND :(");

                setTimeout(function() {

                    console.log("Trying to find: '"+elSelector+"' "+i+"/"+tickCycleTimeout+" @ "+tickSpeed+
                        "ms Time Left: "+((tickSpeed*i) / 1000)+"/"+((tickSpeed*tickCycleTimeout)/1000));

                    this.findElement(elSelector, callback, tickSpeed, tickCycleTimeout, i);


                }.bind(this), tickSpeed);
            }
            else {
                console.log("GAVE UP, NEVER FOUND");
            }
        }

    }
}