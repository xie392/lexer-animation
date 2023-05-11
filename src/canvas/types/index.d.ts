import Konva from 'konva'
import { GroupKitInterface } from '$/types/plugin'

/**
 * 画布配置
 * @export DrawOptionsInterface
 */
export interface DrawInterface {
  /**
   * 画布 id
   * @param {string} id
   */
  id: string
  /**
   * 画布宽度
   * @param {number} width
   */
  width: number
  /**
   * 画布高度
   * @param {number} height
   */
  height: number
  /**
   * 画布实例
   * @param {Konva.Stage} stage
   */
  stage: Konva.Stage
  /**
   * 画布图层
   * @param {Konva.Layer} layer
   */
  layer: Konva.Layer
  /**
   * 画布上的点
   * @param {Array<PointListInterface>} point
   */
  group_point: Array<PointListInterface>
  /***
   * 组
   * @param {Konva.Group} group
   */
  group: Konva.Group
  /**
   * 时间，主要用于图形显示的时间
   * @param {number} time
   */
  time: number
  /**
   * 队列，把所有的图形都放在这里面，然后从头开始渲染，达到动画效果
   * @param {Array<QueueInterface>} queue
   */
  queue: Array<{ [key: string]: QueueInterface }>
  /**
   * 动画组，可以在这里面添加动画，然后调用 render 方法，就可以渲染动画
   * @param {Array<AnimationGroupInterface>} animation_group
   * @example
   * [
   *  {
   *    kind: 'Rect',
   *    value: {
   *      x: 0,
   *      y: 0,
   *      width: 100,
   *      ...
   *    }
   *  }
   *  ...
   * ]
   */
  animation_group: Array<AnimationGroupInterface>
  /**
   * 是否是块元素
   * @param {boolean} block
   */
  block: boolean
  /**
   * 块元素
   * @param {Konva.Rect} block_Rect
   */
  block_Rect: Konva.Rect
  /**
   * 插件列表
   * @param {GroupKitInterface[]} pluginList
   */
  pluginList: GroupKitInterface[]
  /**
   * 画布初始化
   * @returns {Konva.Stage}
   */
  init(): Konva.Stage
  /**
   * 获取最后一个坐标点
   * @returns {PointListInterface}
   */
  getGroupEnd(): PointListInterface
  /**
   * 添加大组
   * @returns {Konva.Rect}
   */
  drawBigGroup(): Konva.Rect
  /**
   * 添加坐标点
   * @param {PointListInterface} point
   */
  addGroupPoint(point: PointListInterface): void
  /**
   * 设置时间
   * @param {number} time
   */
  setTime(time?: number): void
  /**
   * 插入绘制事件
   * @param {string} name   事件名称
   * @param {any} params    事件参数
   */
  insert(name: string, params: any): void
  /**
   * 块元素开始，创建块元素
   */
  blockStart(): void
  /**
   * 块元素结束,把坐标点添加到坐标列表中
   */
  blockEnd(): void
  /**
   * 从队列中从头开始渲染 如果要绘制图形就必须调用这个方法
   * @param {number} timer 每个动画的时间
   * @returns {void}
   */
  render(timer: number): void
  /**
   * 动画
   * @param {QueueInterface} shape 动画对象
   * @param {any} options 动画参数
   */
  animation(shape: QueueInterface, options: any = {}): void
  /**
   * 清空画布
   * @returns {void}
   */
  clear(): void
  /**
   * 销毁
   * @returns {void}
   */
  destroy(): void
}

/**
 * Draw 类的配置
 * @export DrawOptionsInterface
 */
export interface DrawOptionsInterface {
  /**
   * 画布 id
   * @param {string} id
   */
  id: string
  /**
   * 画布宽度
   * @param {number} width
   * @default 300
   */
  width?: number
  /**
   * 画布高度
   * @param {number} height
   * @default 150
   */
  height?: number
}

/**
 * 存储的坐标点
 * @interface PointInterface
 */
export interface ListInterface {
  /**
   * 起始点 x 坐标
   * @type {number}
   */
  x1: number
  /**
   * 起始点 y 坐标
   * @type {number}
   */
  y1: number
  /**
   * 结束点 x 坐标
   * @type {number}
   */
  x2: number
  /**
   * 结束点 y 坐标
   * @type {number}
   */
  y2: number
}

export interface PointListInterface {
  /**
   * 坐标组类型 例如：statement | expression | ...
   * @type {string}
   */
  kind: string
  /**
   * 坐标组内容
   * @type {ListInterface}
   */
  value: ListInterface
}

/**
 * 存储在队列中的图形
 * @interface QueueInterface
 */
export type QueueInterface =
  | Konva.Text
  | Konva.Rect
  | Konva.Circle
  | Konva.Group
  | Konva.Shape
  | Konva.Line
  | Konva.Image
  | Konva.Star
  | Konva.Tag
  | Konva.TextPath
  | Konva.Wedge
  | Konva.Arc
  | Konva.Ellipse
  | Konva.RegularPolygon
  | Konva.Path
  | Konva.Sprite
  | Konva.Label
  | Konva.Arrow
  | Konva.Ring
  | Konva.Shape
  | any

/**
 * 声明变量的参数
 * @interface StatementOptionsInterface
 */
export interface StatementOptionsInterface {
  /**
   * 变量声明的类型 let | const | var
   * @type {string}
   */
  kind: string
  /**
   * 变量内容
   * @type {Array<{ name: string; value: any }>}
   * @example
   * let a = 1, b = 2
   * [
   *  { name: 'a', value: 1 },
   *  { name: 'b', value: 2 },
   *  ...
   * ]
   */
  body: Array<{ name: string; value: any }>
}

/**
 * 普通表达式 a + b   1 + 2
 * @interface ExpressionInterface
 */
export interface ExpressionInterface {
  left: ExpressionInterface | string
  right: ExpressionInterface | string
  operator: string
}

/**
 * 表达式所需参数
 * @interface ExpressionOptionsInterface
 */
export interface ExpressionOptionsInterface {
  left: ExpressionInterface | string
  right: ExpressionInterface | string
  operator: string
  result: string
}

/**
 * 赋值表达式
 * @interface AssignmentExpressionInterface
 */
export interface AssignmentExpressionInterface {
  /**
   * 左边的值
   * @type {string}
   */
  left: string
  /**
   * 右边的值
   * @type {string}
   */
  right: string | number
}

/**
 * 函数
 * @interface FunctionInterface
 */
export interface FunctionInterface {
  /**
   * 函数名
   * @type {string}
   * @memberof FunctionInterface
   */
  name: string
  /**
   * 函数参数
   * @type {string[]}
   * @memberof FunctionInterface
   */
  params: string[]
  /**
   * 函数体
   * @type {string}
   * @memberof FunctionInterface
   */
  body: string
}

export interface AnimationGroupInterface {
  /**
   * 动画 key 值
   * @example
   * 'Text' | 'Rect' | 'Circle' | ...
   */
  kind: string
  /**
   * 动画对象
   * @example
   * {
   *   fill: 'red',
   *   x: 50,
   *   y: 50,
   *   ...
   * }
   */
  value: {
    [key: string]: any
  }
}

export interface RenderInterface {
  /**
   * 名字
   * @param {string} name
   */
  name: string
  /**
   * 图形类别
   * @param {QueueInterface} value
   */
  value: QueueInterface
  /**
   * 动画参数
   * @param {any} options
   */
  options?: {
    [key: string]: any
  }
}
