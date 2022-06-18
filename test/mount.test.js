import './_setup.js'
import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { isVNode, h, createApp } from 'vue'
import { mount as createComponentInstance } from '../index.js'

const createComponent = (options) => ({
  template: '<h1 class="my-class">Hello {{ name }}<slot /></h1>',
  props: { name: String },
  ...options
})

test('it can create an instance without any optional arguments', () => {
  const comp = createComponent()
  const { vNode, el } = createComponentInstance(comp)
  assert.ok(isVNode(vNode))
  assert.is(el.tagName, 'DIV')
})

test('it can create an instance with props', () => {
  const comp = createComponent()
  const props = { name: 'world' }
  const { el } = createComponentInstance(comp, { props })
  assert.is(el.querySelector('h1').textContent, 'Hello world')
})

test('it can create an instance with children', () => {
  const comp = createComponent()
  const children = () => h('span', 'hello')
  const { el } = createComponentInstance(comp, { children })
  assert.is(el.querySelector('h1').textContent, 'Hello hello')
})

test('it can create an instance with props and children', () => {
  const comp = createComponent()
  const props = { name: 'there ' }
  const children = () => h('span', 'world')
  const { el } = createComponentInstance(comp, { props, children })
  assert.is(el.querySelector('h1').textContent, 'Hello there world')
})

test('it can create mount into a specified DOM element', () => {
  const comp = createComponent()
  const element = document.createElement('section')
  const { el } = createComponentInstance(comp, { element })
  assert.is(el.tagName, 'SECTION')
})

test('it can create create a component instance with mount hooks', () => {
  let called = false
  const mounted = () => called = true
  const comp = createComponent({ mounted })
  createComponentInstance(comp)
  assert.ok(called)
})

test('it can create create a component instance with unmount hooks', () => {
  let called = false
  const unmounted = () => called = true
  const comp = createComponent({ unmounted })
  const { destroy } = createComponentInstance(comp)
  assert.not(called)
  destroy()
  assert.ok(called)
})

test('it can remove itself from the DOM when destroyed', () => {
  const comp = createComponent()
  const { el, destroy } = createComponentInstance(comp)
  assert.is(el.querySelector('h1').textContent, 'Hello ')
  destroy()
  assert.is(el.querySelector('h1'), null)
})

test('it lacks appContext without an app being provided', () => {
  const comp = createComponent()
  const { vNode } = createComponentInstance(comp)
  assert.not(vNode.appContext)
})

test('it can append an appContext to the vNode', () => {
  const appComponent = createComponent()
  const comp = createComponent()
  const app = createApp(appComponent)
  const { vNode } = createComponentInstance(comp, { app })
  assert.ok(vNode.appContext)
})

test.run()
