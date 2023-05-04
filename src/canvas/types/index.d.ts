import Konva from 'konva'
import { GroupKitInterface } from '$/types/plugin'

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
   * 销毁
   * @returns {void}
   */
  destroy(): void
}

export interface DrawOptionsInterface {
  id: string
  width?: number
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

export interface StatementOptionsInterface {
  kind: string
  body: Array<{ name: string; value: any }>
}

export interface ExpressionInterface {
  left: ExpressionInterface | string
  right: ExpressionInterface | string
  operator: string
}

export interface ExpressionOptionsInterface {
  left: ExpressionInterface | string
  right: ExpressionInterface | string
  operator: string
  result: string
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
}
