import Konva from 'konva'

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
   * 时间
   * @param {number} time
   */
  time: number
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
