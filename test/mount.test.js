import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { isVNode, h } from 'vue'
import { mount as createComponentInstance } from '../index'

const createComponent = (options) => ({
  template: '<h1 class="my-class">Hello {{ name }}<slot /></h1>',
  props: { name: String }
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
  const { vNode, el } = createComponentInstance(comp, { props })
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

// mount and unmount hooks run
// destroy
// app context

test.run()
