/// <reference path="../libraries/definitions/jquery.d.ts" />
/// <reference path="./i_Callable.ts" />
/// <reference path="./MultidimensionalStorage.ts" />
/// <reference path="../libraries/definitions/chrome.d.ts" />
/// <reference path="../libraries/definitions/my chrome.d.ts" />


module LikeAG5 {
	export class ExportModalForm implements Callable {

		callback()
		{
			console.log("TEST2");

			var modal =  $("#modal");
			var modalName = $("#myModalLabel").text();
			var inputs = $("input", modal);
			var dump = {
				"modalName": modalName,
				"inputs": []
			};

			inputs.each(()=>{
				dump["inputs"].push($(this).val());
			});

			copy(JSON.stringify(dump));
		}
	}
}
