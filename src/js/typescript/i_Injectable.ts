/// <reference path="./Hooks.ts" />

module LikeAG5 {
    export interface Injectable {
        inject(hooks: Hooks): void;
    }
}