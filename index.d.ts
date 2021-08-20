import { Component, App, VNode } from 'vue'

export type MountResult = {
    vNode: VNode;
    el: HTMLElement;
    destroy: Function;
};
export function mount(component: Component, { props, children, element, app }?: {
    props?: object;
    children?: unknown;
    app?: App;
    element?: HTMLElement;
}): MountResult;
