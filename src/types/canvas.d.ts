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
  x: number
  y: number
}

export interface DrawInterface {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  options: CanvaOptionsInterface

  point: PointInterface

  /**
   * 修改画布配置
   * @param options
   */
  setOptions(options: CanvaOptionsInterface): void

  /**
   * 画布公共方法
   * @param callback
   */
  draw(callback: () => void): void

  /**
   * 绘画图片
   * @param img
   * @param x
   * @param y
   * @param width
   * @param height
   */
  drawImage(
    img: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number,
    options?: CanvaOptionsInterface
  ): void

  /**
   * 绘制矩形
   * @param x
   * @param y
   * @param width
   * @param height
   * @param color
   */
  drawRect(x: number, y: number, width: number, height: number, color: string): void

  /**
   * 绘制圆形
   * @param x
   * @param y
   * @param radius
   * @param color
   */
  drawCircle(x: number, y: number, radius: number, color: string): void

  /**
   * 绘制文本
   * @param text
   * @param x
   * @param y
   * @param font
   * @param color
   */
  drawText(x: number, y: number, text: string, color: string): void

  /**
   * 绘制线条
   * @param x
   * @param y
   * @param x1
   * @param y1
   * @param lineWidth
   * @param color
   */
  drawLine(x: number, y: number, x1: number, y1: number, lineWidth: number, color: string): void

  /**
   * 清楚画布
   */
  clear(): void
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
  stroke?:string
  // 边框宽度
  strokeWidth?:number
  // 阴影
  shadowBlur?: number
  //圆角
  cornerRadius?: number | number[]
}
