import { CanvaOptionsInterface, DrawInterface, PointInterface } from '#/canvas'

export default class Draw implements DrawInterface {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  options: CanvaOptionsInterface
  point: PointInterface = { x: 0, y: 0 }

  constructor(options: CanvaOptionsInterface) {
    this.canvas = document.getElementById(options.id as string) as HTMLCanvasElement
    this.options = options
    this.canvas.width = this.options.width || this.canvas?.offsetWidth
    this.canvas.height = this.options.height || this.canvas?.offsetHeight

    // 如果找不到 canvas 元素，就创建一个 添加到 body 中
    if (!this.canvas) {
      this.canvas = document.createElement('canvas')
      this.canvas.id = options.id as string
      this.canvas.width = options?.width || 300
      this.canvas.height = options?.height || 150
      document.body.appendChild(this.canvas)
    }

    this.canvas.addEventListener('click', this.getPonit)

    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
  }

  /**
   * 修改参数
   * @param options
   */
  public setOptions(options: CanvaOptionsInterface) {
    Object.assign(this.options, options)
  }

  /**
   * 获取点击坐标
   * @param event MouseEvent
   */
  public getPonit(event: MouseEvent) {
    const x = event.offsetX
    const y = event.offsetY
    this.point = { x, y }

    console.log('point: ', this.point)
    console.log('event: ', event)
  }

  /**
   * 判断是否在矩形内
   * @param x
   * @param y
   * @param width
   * @param height
   * @param point
   */
  public isPointInRect(x: number, y: number, width: number, height: number, point: PointInterface) {
    return point.x >= x && point.x <= x + width && point.y >= y && point.y <= y + height
  }

  /**
   * 所有的绘制公共方法
   * @callback drawCallback
   */
  public draw(callback: () => void, options?: CanvaOptionsInterface) {
    //保存状态
    this.ctx.save()
    //开启路径
    this.ctx.beginPath()
    // 2d转
    this.ctx.translate(this.options?.translateX || 0, this.options?.translateY || 0)
    // 缩放
    this.ctx.scale(this.options?.scaleX || 1, this.options?.scaleY || 1)
    // 旋转
    this.ctx.rotate((this.options?.rotate || 0 * Math.PI) / 180)
    // 透明度
    this.ctx.globalAlpha = this.options?.opacity || 1

    // 如果传有参数，就更新参数
    if (options) {
      this.setOptions(options)
    }

    // 在这里调用回调函数
    callback()

    if (this.options?.fillStyle) {
      this.ctx.fillStyle = this.options?.fillStyle
      //设置背景颜色
      this.ctx.fill()
    }
    if (this.options?.strokeStyle) {
      this.ctx.lineWidth = this.options?.lineWidth || 1
      this.ctx.strokeStyle = this.options?.strokeStyle
      //设置边颜色
      this.ctx.stroke()
    }
    //闭合路径
    this.ctx.closePath()
    //还原状态
    this.ctx.restore()
  }

  /**
   * 绘制图片
   * @param img  图片对象
   * @param x    x轴坐标
   * @param y    y轴坐标
   * @param width  图片宽度
   * @param height 图片高度
   * @param options  其他参数
   */
  public drawImage(
    img: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number,
    options?: CanvaOptionsInterface
  ) {
    this.draw(() => {
      this.ctx.drawImage(img, x, y, width, height)
    }, options)
  }

  /**
   * 绘制矩形
   * @param x   x轴坐标
   * @param y   y轴坐标
   * @param width   宽度
   * @param height  高度
   * @param color   颜色
   * @param options   其他参数
   */
  public drawRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    options?: CanvaOptionsInterface
  ) {
    this.draw(() => {
      this.ctx.fillStyle = color
      this.ctx.fillRect(x, y, width, height)
    }, options)
  }

  /**
   * 绘制圆角矩形
   * @param x   x轴坐标
   * @param y   y轴坐标
   * @param radius  圆角半径
   * @param color   颜色
   * @param options  其他参数
   */
  public drawCircle(
    x: number,
    y: number,
    radius: number,
    color: string,
    options?: CanvaOptionsInterface
  ) {
    this.draw(() => {
      this.ctx.fillStyle = color
      this.ctx.arc(x, y, radius, 0, Math.PI * 2)
      if (!options?.strokeStyle) {
        this.setOptions({ strokeStyle: color })
      }
    }, options)
  }

  /**
   * 绘制文字
   * @param x   x轴坐标
   * @param y   y轴坐标
   * @param text  文字
   * @param color   颜色
   * @param options 其他参数
   */
  public drawText(
    x: number,
    y: number,
    text: string,
    color?: string,
    font?: string,
    options?: CanvaOptionsInterface
  ) {
    this.draw(() => {
      this.ctx.fillStyle = color || '#000'
      this.ctx.font = font || '16px Arial'
      this.ctx.fillText(text, x, y)
    }, options)
  }

  /**
   * 绘制线条
   * @param x  x轴坐标
   * @param y  y轴坐标
   * @param x1 x轴坐标
   * @param y1 y轴坐标
   * @param lineWidth 线条宽度
   * @param color 颜色
   * @param opacity 透明度
   */
  public drawLine(
    x: number,
    y: number,
    x1: number,
    y1: number,
    lineWidth: number,
    color: string,
    options?: CanvaOptionsInterface
  ): void {
    this.draw(() => {
      this.ctx.lineWidth = lineWidth
      this.ctx.strokeStyle = color
      this.ctx.moveTo(x, y)
      this.ctx.lineTo(x1, y1)
    }, options)
  }

  /**
   * 清除画布
   */
  public clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
