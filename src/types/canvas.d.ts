import Konva from 'konva'

export interface PointInterface {
  minX: number
  maxX: number
  minY: number
  maxY: number
}

export type KonvaInterface = Konva.Text | Konva.Rect | Konva.Circle | Konva.Group | Konva.Shape

export interface DrawInterface {
  /**
   * 坐标列表[每绘制一个图形就会添加一个坐标]
   * @type {Array<PointInterface>}
   */
  point: Array<PointInterface>
  /**
   * 坐标组列表[每绘制一个组就会添加一个坐标] 一个框为一组
   * @type {Array<PointInterface>}
   */
  groupPoint: Array<PointInterface>
  /**
   * konva 列表
   * @type {Array<KonvaInterface>}
   */
  konvaList: Array<KonvaInterface>
  /**
   * 组
   * @type {Konva.Group}
   */
  group: Konva.Group
  /**
   * 画布 id
   * @type {string}
   */
  id: string
  /**
   * 画布宽
   * @type {number}
   */
  height?: number
  /**
   * 画布宽
   * @type {number}
   */
  width?: number
  /**
   * konva 实例
   * @type {Konva.Stage}
   */
  stage: Konva.Stage
  /**
   * konva 层
   * @type {Konva.Layer}
   */
  layer: Konva.Layer
  /**
   * 初始化
   * @returns {Konva.Stage}
   */
  init(): Konva.Stage
  /**
   * 绘制矩形
   * @param x x坐标
   * @param y y坐标
   * @param width 宽度
   * @param height  高度
   * @param options 配置项
   */
  drawRect(
    x: number,
    y: number,
    width: number,
    height: number,
    options: OptionsInterface
  ): Konva.Rect
  /**
   * 绘制圆形
   * @param x
   * @param y
   * @param radius
   * @param color
   */
  drawCircle(x: number, y: number, radius: number, options: OptionsInterface): Konva.Circle
  /**
   * 绘制文本
   * @param text
   * @param x
   * @param y
   * @param font
   * @param color
   */
  drawText(x: number, y: number, text: string, options: OptionsInterface): Konva.Text
  /**
   * 绘制线
   * @param points 坐标点
   * @param color 颜色
   * @param width 宽度
   * @param lineCap 线条末端样式
   * @param lineJoin 线条连接样式
   * @param dash  虚线
   * @param tension 张力
   * @param closed 是否闭合
   * @param fill 填充颜色
   * @param fillEnabled 是否填充
   * @param strokeEnabled 是否描边
   * @param draggable 是否可拖拽
   */
  /**
   * 添加坐标
   * @param point  坐标组
   */
  addPoint(point: PointInterface): void
  /**
   * 自动给图形分配坐标
   * @param callback 回调函数
   * @returns { x:number; y:number }
   */
  autoPoint?(callback: Function): { x: number; y: number }
  /**
   * 中心坐标,确保该坐标在画布中间
   * @param width  要绘制图形的宽度
   * @param height 要绘制图形的高度
   * @returns { x:number; y:number }
   */
  centerPoint(width: number, height: number): { x: number; y: number }
  /**
   * 判断某点坐标是否在 Point 里面
   * @param x x坐标
   * @param y y坐标
   * @returns boolean
   */
  isPointInPath(x: number, y: number): boolean
  /**
   * 添加图层
   * @param layer 图层
   * @returns void
   */
  addLayer(layer: Konva.Layer): void
  /**
   * 添加组
   * @param group 组
   * @returns void
   */
  addGroup(group: Konva.Group): void
  /**
   * 添加图形
   * @param shape
   * @returns void
   */
  addShape(shape: KonvaInterface): void
  /**
   * 添加图形层 添加多个
   * @param {Array<KonvaInterface>} shapeList
   * @returns void
   */
  addShapeLayerList(shapeList: Array<KonvaInterface>): void
  /**
   * 添加图形组
   * @param {KonvaInterface} shape
   * @returns void
   */
  addShapeGroup(shape: KonvaInterface): void
  /**
   * 添加图形组 添加多个
   * @param { Array<KonvaInterface>} shapeList
   * @returns void
   */
  addShapeGroupList(shapeList: Array<KonvaInterface>): void
  /**
   * 添加图形层
   * @param shape
   * @returns void
   */
  addShapeLayer(shape: KonvaInterface): void
  /**
   * 添加图形层 添加多个
   * @param {Array<KonvaInterface>} shapeList
   */
  run(): void
  /**
   * 销毁
   * @returns void
   */
  destroy(): void
}

export interface CanvaOptionsInterface {
  /**
   * 画布id
   * @type {string}
   */
  id: string
  /**
   * 画布宽度
   * @type {number}
   */
  width?: number
  /**
   * 画布高度
   * @type {number}
   */
  height?: number
}

// 绘制图形的可选参数
export interface OptionsInterface {
  /**
   * 填充颜色
   * @type {string}
   */
  fill?: string
  /**
   * 边框颜色
   * @type {string}
   */
  stroke?: string
  /**
   * 边框宽度
   * @type {number}
   */
  strokeWidth?: number
  /**
   * 阴影颜色
   * @type {string}
   */
  shadowBlur?: number
  /**
   * 阴影颜色
   * @type {string}
   */
  cornerRadius?: number | number[]
  /**
   * 阴影颜色
   * @type {string}
   */
  fontSize?: number
}
