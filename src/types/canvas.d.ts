import Konva from 'konva'

// export interface CanvaOptionsInterface {
//   // 画布id
//   id?: string
//   // 画布宽度
//   width?: number
//   // 画布高度
//   height?: number
//   // x 坐标
//   x?: number
//   // y 坐标
//   y?: number
//   // 元素宽度
//   w?: number
//   // 元素高度
//   h?: number
//   // 圆心半径
//   radius?: number
//   // 起始角度
//   startAngle?: number
//   // 结束角度
//   endAngle?: number
//   // 顺时针还是逆时针
//   anticlockwise?: boolean
//   // 图像路径
//   src?: string
//   // 裁剪 x轴
//   sx?: number
//   // 裁剪 y轴
//   sy?: number
//   // 裁剪 宽
//   sw?: number
//   // 裁剪 高
//   sh?: number
//   // 线的宽度
//   lineWidth?: number
//   // 文字内容
//   text?: string
//   // 文字颜色
//   font?: string
//   // 填充颜色
//   fillStyle?: string
//   // 描边颜色
//   strokeStyle?: string
//   // 透明度
//   opacity?: number
//   // 2d转换 x轴
//   translateX?: number
//   // 2d转换 y轴
//   translateY?: number
//   // 2d转换 x轴缩放
//   scaleX?: number
//   // 2d转换 y轴缩放
//   scaleY?: number
//   // 2d转换 旋转
//   rotate?: number
// }

export interface PointInterface {
  minX: number
  maxX: number
  minY: number
  maxY: number
}

// export interface KonvaInterface {
//   rect?: Konva.Rect
//   text?: Konva.Text
//   circle?: Konva.Circle
// }

export type KonvaInterface = Konva.Rect | Konva.Text | Konva.Circle

export interface DrawInterface {
  // 坐标
  point: Array<PointInterface>

  konvaList: Array<KonvaInterface>

  id: string
  height?: number
  width?: number

  // konva 实例
  stage: Konva.Stage
  layer: Konva.Layer

  /**
   * 绘制矩形
   * @param x
   * @param y
   * @param width
   * @param height
   * @param color
   */
  drawRect(width: number, height: number, options: OptionsInterface): Konva.Rect

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
   * 添加坐标
   * @param point  坐标组
   */
  addPoint(point: PointInterface): void

  /**
   * 自动给图形分配坐标
   * @param callback 回调函数
   * @returns { x:number; y:number }
   */
  autoPoint(callback: Function): { x: number; y: number }

  /**
   * 中心坐标,确保该坐标在画布中间
   * @param width  要绘制图形的宽度
   * @param height 要绘制图形的高度
   * @returns { x:number; y:number }
   */
  centerPoint(width: number, height: number): { x: number; y: number }

  run(): void
}

export interface CanvaOptionsInterface {
  // 画布id
  id: string
  // 画布宽度
  width?: number
  // 画布高度
  height?: number
}

// 绘制图形的可选参数
export interface OptionsInterface {
  // 填充色
  fill?: string
  // 边框颜色
  stroke?: string
  // 边框宽度
  strokeWidth?: number
  // 阴影
  shadowBlur?: number
  //圆角
  cornerRadius?: number | number[]
  // 字体大小
  fontSize?: number
}
