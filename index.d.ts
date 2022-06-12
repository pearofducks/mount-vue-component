import { Component, App, VNode } from 'vue'

export type MountResult = {
    vNode: VNode;
    el: HTMLElement;
    destroy: Function;
};
export function mount<TProps>(component: Component, { props, children, element, app }?: {
    props?: TProps;
    children?: unknown;
    app?: App;
    element?: HTMLElement;
}): MountResult;
