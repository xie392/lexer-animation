import { OptionsInterface, CanvaOptionsInterface, PointInterface } from '#/canvas'
import Konva from 'konva'

export default class Draw {
  // 坐标
  point: PointInterface = { x: 0, y: 0 }

  id: string
  height: number
  width: number

  // konva 实例
  stage: Konva.Stage
  layer: Konva.Layer = new Konva.Layer()

  constructor(options: CanvaOptionsInterface) {
    this.id = options.id as string
    if (!this.id) throw new Error('id 找不到')
    this.width = options.width || 300
    this.height = options.height || 150
    this.stage = this.init()
  }

  /**
   * 初始化画布
   * @returns Konva.Stage
   */
  init() {
    const stage = new Konva.Stage({
      container: this.id
    })
    return stage
  }

  /**
   * 绘制圆形
   * @param x
   * @param y
   * @param radius
   */
  drawCircle(x: number, y: number, radius: number) {
    const circle = new Konva.Circle({
      x,
      y,
      radius,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4
    })
    this.layer.add(circle)
  }

  /**
   * 绘制矩形
   * @param x       x轴坐标
   * @param y       y轴坐标
   * @param width   长
   * @param height  高
   * @param options 可选参数
   */
  drawRect(x: number, y: number, width: number, height: number, options: OptionsInterface) {
    const rect = new Konva.Rect({
      x,
      y,
      width,
      height,
      fill: options.fill || 'green',
      stroke: options.stroke || 'black',
      strokeWidth: options.strokeWidth || 1
    })
    this.layer.add(rect)
  }
}
