import { App } from 'vue'

export interface OptionsInterface {
  // 是否居中
  center?: boolean
  // 是否启用 hash
  hash?: boolean
  // 自动播放
  autoSlide?: number
  // 幻灯片切换效果
  transition?: string
  // 是否循环
  loop?: boolean
  // 是否显示进度条
  progress?: boolean
  // 是否启用浏览器历史记录
  history?: boolean
  // 是否嵌入
  embedded?: boolean
  // 是否显示控制按钮
  controls?: boolean
  // 布局方式，可选值为：'linear'、'grid'、'default'，默认为 'default'
  layout?: string
  // 每次演示加载时随机化幻灯片的顺序
  shuffle?: boolean
  // 插件
  plugins?: any[]
  // 幻灯片宽度
  width?: number
  // 幻灯片高度
  height?: number
  // 幻灯片间距
  margin?: number
  // 最小缩放比例
  minScale?: number
  // 最大缩放比例
  maxScale?: number
}

export interface ConstructorInterface {
  el: string
}

export interface AnimationsInterface {
  // ppt 编辑器
  editor: any

  // ppt 容器 id
  el: string

  // 默认配置项
  defaultOptions: OptionsInterface

  /**
   * 初始化动画 ppt
   * @param options 配置项
   * @returns
   * @memberof Animations
   * @example
   * ```js
   * import { Animations } from 'animations'
   * const animations = new Animations()
   * animations.init()
   * ```
   */
  init(options?: OptionsInterface): void
  /**
   * 设置属性
   * @param options 配置项
   * @returns
   * @memberof Animations
   * @example
   * ```js
   * import { Animations } from 'animations'
   * const animations = new Animations()
   * animations.setOptions({ width: 960, height: 700 })
   * ```
   */

  setOptions(options: OptionsInterface): void
  /**
   * 添加幻灯片
   * @param slide 幻灯片内容
   * @param index 幻灯片索引
   * @param options 配置项
   * @returns
   */

  addSlide(slide: string, index?: number, options?: OptionsInterface): void

  /**
   * 删除幻灯片
   * @param index 幻灯片索引
   * @param options 配置项
   * @returns
   * @memberof Animations
   * @example
   * ```js
   * import { Animations } from 'animations'
   * const animations = new Animations()
   * animations.removeSlide(1)
   * ```
   */
  removeSlide(index: number, options?: OptionsInterface): void

  /**
   * 挂载幻灯片组件
   * @param app 幻灯片组件
   * @param index 幻灯片索引
   * @param options 配置项
   */
  mountSlide(app: App, index?: number, options?: OptionsInterface): void

  /**
   * 添加变量声明幻灯片
   * @param statement 幻灯片内容
   * @param index 幻灯片索引
   * @param options 配置项
   * @returns
   * @memberof Animations
   * @example
   * ```js
   * import { Animations } from 'animations'
   * const animations = new Animations()
   * animations.addStatementSlide('let a = 1')
   * ```
   */
  addStatementSlide(statement: string, index?: number, options?: OptionsInterface): void

  /**
   * 添加表达式幻灯片
   * @param expression 幻灯片内容
   * @param index 幻灯片索引
   * @param options 配置项
   * @returns
   * @memberof Animations
   * @example
   * ```js
   * import { Animations } from 'animations'
   * const animations = new Animations()
   * animations.addExpressionSlide('a + 1')
   * ```
   */
  addExpressionSlide(expression: string, index?: number, options?: OptionsInterface): void

  /**
   * 销毁
   * @returns
   */
  destroy(): void
}
