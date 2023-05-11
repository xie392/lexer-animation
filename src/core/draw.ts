import Konva from 'konva'
import type { DrawInterface, DrawOptionsInterface, GroupInterface } from '~/types/draw'

/**
 * @description: 绘制动画类
 * @implements {DrawInterface}
 */
class Draw implements DrawInterface {
  id: string
  width: number
  height: number
  el: HTMLDivElement
  block: boolean = false

  stage: Konva.Stage
  layer: Konva.Layer = new Konva.Layer()
  group: Konva.Group = new Konva.Group()

  /**
   * @description: 动画绘制的时间间隔
   * @param {number}
   */
  #time: number = 0
  /**T
   * @description: 队列，后面需要循环队列去一个一个渲染
   * @param {Array<{[key:string]:any}>}
   */
  #plugin: any[] = []
  /**
   * @description: 插件列表
   * @type {any[] }
   */
  #queue: any[] = []

  constructor(options: DrawOptionsInterface) {
    this.id = options.id
    if (!this.id) throw new Error('id 找不到')

    const el = document.getElementById(options.id)
    if (!el) throw new Error('找不到画布元素')

    this.el = el as HTMLDivElement
    this.width = options.width || el.offsetWidth || 300
    this.height = options.height || el.offsetHeight || 150

    this.stage = new Konva.Stage({
      container: this.id,
      width: this.width,
      height: this.height
    })
    this.stage.add(this.layer)

    this.#plugin = options.plugin
  }

  getGroupEnd() {
    const len = (this.group?.children?.length as number) || 0
    return this.group?.children?.[len - 1] as GroupInterface
  }

  setTime(time?: number) {
    this.#time = time ? time : this.#time++
  }

  insert(name: string, params: any) {
    try {
      // 遍历插件 找到每一个插件
      this.#plugin.forEach((item) => {
        // 插件名必须要找得到
        if (item.pluginName === name) {
          // 实例化插件
          const plugin = new item(this, params)
          // 运行插件中的 render 方法
          const list = plugin.render()
          // 把插件返回的动画组或实体添加到队列
          this.#queue.push(list)
        }
      })
    } catch (err: any) {
      console.log(err)
      throw new Error(`${err.message}`)
    }
  }

  render(timer: number = 1000) {
    // 遍历队列
    this.#queue.forEach((item) => {
      // 遍历队列中的每一项
      item.forEach((shape: any) => {
        const time = this.#time
        // 一个一个渲染
        setTimeout(() => {
          this.layer.add(shape?.value)
          this.layer.draw()

          // 这里主要是为了计算画布的高度 当元素要超出画布的时候，就要增加画布的高度 而且滚动到最新的位置
          if (shape.value.x() + shape.value.height() > this.stage.height()) {
            this.stage.height(shape.value.x() + shape.value.height() + 100)
            this.el.style.overflowY = 'scroll'
            this.el.style.overflowX = 'hidden'
            this.el.style.height = `${this.stage.height()}px`
            // TODO: 滚动到最新的位置
            // this.el.scrollTop += 10
          }

          requestAnimationFrame(() => {
            // 动画配置
            const options = shape?.options || {}
            // 执行动画
            this.animation(shape.value, options)
          })
        }, time * timer)

        // 每次渲染完毕后，时间 + 1
        this.setTime()
      })
    })
  }

  animation(shape: Konva.Node, options: Array<{ [key: string]: number | string }>) {
    const animate = new Konva.Tween({
      node: shape,
      duration: 0.5,
      opacity: 1,
      y: shape.y() + 15,
      ...options
    })

    animate.play()

    return animate
  }

  destroy() {
    this.layer?.destroy()
    this.stage?.destroy()
  }
}

export default Draw
