/// <reference path="./Hooks.ts" />

module LikeAG5 {
	export interface Callable {
		callback(callback: ()=>any): any;
	}
}