import {
  OptionsInterface,
  CanvaOptionsInterface,
  PointInterface,
  DrawInterface,
  KonvaInterface
} from '#/canvas'
import Konva from 'konva'

export default class Draw implements DrawInterface {
  // 坐标
  point: Array<PointInterface> = []
  // 把所有创建的实例添加进去
  konvaList: Array<KonvaInterface> = []

  id: string
  height?: number
  width?: number

  // konva 实例
  stage: Konva.Stage
  layer: Konva.Layer = new Konva.Layer()

  constructor(options: CanvaOptionsInterface) {
    this.id = options.id as string
    if (!this.id) throw new Error('id 找不到')
    const el = document.getElementById(options.id)
    if (!el) throw new Error('找不到画布元素')
    this.width = options.width || el.offsetWidth || 300
    this.height = options.height || el.offsetHeight || 150
    this.stage = this.init()
  }

  /**
   * 初始化画布
   * @returns Konva.Stage
   */
  init() {
    const stage = new Konva.Stage({
      container: this.id,
      width: this.width,
      height: this.height
    })
    return stage
  }

  /**
   * 绘制圆形
   * @param x
   * @param y
   * @param radius
   */
  drawCircle(x: number, y: number, radius: number, options: OptionsInterface) {
    const circle = new Konva.Circle({
      x,
      y,
      radius,
      ...options
    })
    this.konvaList.push(circle)
    this.layer.add(circle)
    return circle
  }

  /**
   * 绘制矩形
   * @param x       x轴坐标
   * @param y       y轴坐标
   * @param width   长
   * @param height  高
   * @param options 可选参数
   */
  drawRect(width: number, height: number, options: OptionsInterface) {
    const { x, y } = this.centerPoint(width, height)

    const rect = new Konva.Rect({
      x,
      y,
      width,
      height,
      ...options
    })
    this.konvaList.push(rect)
    this.layer.add(rect)
    return rect
  }

  /**
   * 绘制文字
   * @param x
   * @param y
   * @param text
   * @param options
   */
  drawText(x: number, y: number, text: string, options: OptionsInterface): Konva.Text {
    const textNode = new Konva.Text({
      x,
      y,
      text,
      ...options
    })
    this.konvaList.push(textNode)
    this.layer.add(textNode)
    return textNode
  }

  /**
   * 添加坐标到坐标组
   * @param { Array<PointInterface> } Point 坐标 [{x1,y1},{x2,y2},{x3,y3},{x4,y4}]
   */
  addPoint(Point: PointInterface) {
    this.point.push(Point)
  }

  /**
   * 判断某点坐标是否在 Point 里面
   * @param x
   * @param y
   */
  isPointInPath(x: number, y: number) {
    const point = this.point
    let isPointInPath = false
    for (let i = 0; i < point.length; i++) {
      const { minX, maxX, minY, maxY } = point[i]
      /**
       * 例子: { x:10,y: 20 } 是否在 arr =  [
       *     {  minX: 5, maxX:30, minY: 10, maxY:30  },
       *     ......
       * ] 中
       *
       * 大概图形如下:
       *    [5,10]             [30,10]
       *      ------------------
       *      |    (10,20)     |
       *      |                |
       *      ------------------
       *    [5,30]             [30,30]
       *
       *  x = 10, y = 20 得出判断条件: (5 < 10 < 30) && (10 < 20 < 30) 如果满足此条件就说明该坐标在图形内
       */
      if (minX < x && x < maxX && minY < y && y < maxY) {
        isPointInPath = true
        break
      }
      continue
    }

    return isPointInPath
  }

  autoPoint(callback: Function) {
    // 获取上一个图形的坐标
    const { minX, maxX, minY, maxY } = this.point[this.addPoint.length - 1]

    return {
      x: 0,
      y: 0
    }
  }
  /**
   * 中心坐标,确保该坐标在画布中间
   * @param width  要绘制图形的宽度
   * @param height 要绘制图形的高度
   * @returns { x:number; y:number }
   */
  centerPoint(width: number, height: number) {
    const { width: stageWidth, height: stageHeight } = this.stage.attrs

    const x = Math.ceil((stageWidth - width) / 2)
    const y = Math.ceil((stageHeight - height) / 2)

    return { x, y }
  }

  /**
   * 绘制所有有图形
   * @param shapes
   */
  run() {
    this.stage.add(this.layer)
  }
}
