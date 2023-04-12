/**
 * @description 动画 ppt
 * @author xie392
 * @createTime 2023年04月04日 14:00:00
 */
import Reveal from 'reveal.js'
import highlight from 'reveal.js/plugin/highlight/highlight.esm.js'
import markdown from 'reveal.js/plugin/markdown/markdown.esm.js'
import 'reveal.js/plugin/highlight/monokai.css'

import type { OptionsInterface, AnimationsInterface, ConstructorInterface } from '#/animations'

import StatementWrapper from './components/statement.vue'
import ExpressionWrapper from './components/expression.vue'

import { createApp, App } from 'vue'

// 默认配置项
const defaultOptions: OptionsInterface = {
  center: false,
  hash: false,
  autoSlide: 1000,
  transition: 'down',
  loop: false,
  progress: false,
  history: false,
  embedded: false,
  controls: false,
  layout: 'linear',
  shuffle: false,
  plugins: [highlight, markdown]
}

export class Animations implements AnimationsInterface {
  editor: typeof Reveal

  el: string = ''

  defaultOptions: OptionsInterface = defaultOptions

  constructor(options: ConstructorInterface) {
    this.el = options.el
    this.editor = new Reveal(document.getElementById(this.el))

    console.log('this.editor', this.editor)

    this.init()
  }

  // 初始化
  init(options?: OptionsInterface) {
    this.editor.initialize(Object.assign({}, this.defaultOptions, options))
  }

  // 设置配置项
  setOptions(options: OptionsInterface) {
    this.editor.configure(options)
  }

  // 添加幻灯片
  addSlide(slide: string, index?: number, options?: OptionsInterface) {
    if (options) {
      this.setOptions(options)
    }
    // this.editor.addSlide(index, slide)
    //  this.editor.sync()
    console.dir(this.editor)
    console.dir(this.editor.sync)
  }

  // 移除幻灯片
  removeSlide(index: number, options?: OptionsInterface) {
    if (options) {
      this.setOptions(options)
    }
    this.editor.removeSlide(index)
  }

  // 挂载幻灯片组件
  mountSlide(app: App, index?: number, options?: OptionsInterface) {
    const div = document.createElement('div')
    app.mount(div)
    const el = document.querySelector(this.el)
    if (index) {
      el?.insertBefore(div, el.children[index])
    } else {
      el?.appendChild(div)
    }
    console.log(el)
  }

  // 添加变量声明
  addStatementSlide(statement?: string, index?: number, options?: OptionsInterface) {
    const app = createApp(StatementWrapper, {
      statement: [
        {
          type: 'identifier',
          name: 'a',
          value: ''
        },
        {
          type: 'identifier',
          name: 'b',
          value: '2'
        }
      ]
    })
    this.mountSlide(app, index, options)
  }

  // 添加表达式
  addExpressionSlide(expression: string, index?: number, options?: OptionsInterface) {
    const app = createApp(ExpressionWrapper, { expression })
    this.mountSlide(app, index, options)
  }

  destroy() {
    this.editor?.destroy()
  }
}
