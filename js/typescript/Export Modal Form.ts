/// <reference path="../libraries/definitions/jquery.d.ts" />
/// <reference path="./i_Injectable.ts" />
/// <reference path="./MultidimensionalStorage.ts" />
/// <reference path="./Hooks.ts" />

module LikeAG5 {
	export class AutoPlaceholder implements Injectable {

		inject(hooks:Hooks) {

			console.log("AutoPlaceholder Injected");

			// todo need to make sure that the targetWatch exists first
			hooks.findElement('.ember-view>.page', function() {

				hooks.addDOMMutationObserver('autoPlaceholder', domMutationCallback);

				var targetWatch = document.querySelector('.ember-view>.page');
				hooks.addObserverTarget('autoPlaceholder', targetWatch);

				function domMutationCallback(mutations) {

					console.log("AutoPlaceholder DOM Mutation Callback triggered");
					console.log(mutations);

					// todo Add logic to determine What DOM mutation triggers the hooks.setjQueryBind to be set
					/*function(mutations) {

					 mutations.forEach(function(mutation) {
					 //console.log(mutation.type);
					 console.log(mutation);
					 });
					 }*/

					hooks.addDOMMutationObserver('modalWatch', modalWatchCallback);
					var modalWatchTarget = document.querySelector('#modal');
					hooks.addObserverTarget('modalWatch', modalWatchTarget);

					function modalWatchCallback(mutations) {
						console.log("Modal Watch Callback Triggered");
						console.log(mutations);

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
					}
				}
			});
		}
	}
}
