import Konva from 'konva'
import {
  DrawOptionsInterface,
  DrawInterface,
  PointListInterface,
  QueueInterface,
  AnimationGroupInterface
} from '$/types/index'
import { GroupKitInterface } from '$/types/plugin'

// 默认动画组
const default_animation_group: Array<AnimationGroupInterface> = []

class Draw implements DrawInterface {
  id: string
  width: number
  height: number
  el: HTMLCanvasElement

  stage: Konva.Stage
  layer: Konva.Layer = new Konva.Layer()
  group: Konva.Group = new Konva.Group()
  group_point: Array<PointListInterface> = []

  time: number = 0
  queue: Array<{ [key: string]: QueueInterface }> = []
  animation_group: Array<AnimationGroupInterface> = default_animation_group

  block: boolean = false
  block_Rect: Konva.Rect = new Konva.Rect()
  block_group: Konva.Group = new Konva.Group()

  pluginList: GroupKitInterface[] = []

  constructor(options: DrawOptionsInterface, pluginList: GroupKitInterface[] = []) {
    this.id = options.id
    if (!this.id) throw new Error('id 找不到')
    const el = document.getElementById(options.id)
    if (!el) throw new Error('找不到画布元素')
    this.el = el as HTMLCanvasElement
    this.width = options.width || el.offsetWidth || 300
    this.height = options.height || el.offsetHeight || 150
    this.stage = this.init()
    this.stage.add(this.layer)

    // 添加插件
    pluginList.forEach((plugin) => {
      this.pluginList.push(plugin)
    })
  }

  init() {
    const stage = new Konva.Stage({
      container: this.id,
      width: this.width,
      height: this.height
    })
    return stage
  }

  getGroupEnd() {
    return this.group_point[this.group_point.length - 1]
  }

  addGroupPoint(point: PointListInterface) {
    this.group_point.push(point)
  }

  drawBigGroup(h: number = 60) {
    const group = this.getGroupEnd()

    const y2 = group?.value?.y2
    const y = y2 ? y2 + 10 : 10

    const width = this.block ? this.stage.width() * 0.8 - 20 : this.stage.width() - 20
    const x = this.block ? this.stage.width() * 0.2 : 10

    // 如果是 block，那么就不要超过 block 的高度
    if (this.block && y > this.block_Rect.height() - 20) {
      this.block_Rect.height(y)
    }

    const group_rect = new Konva.Rect({
      x,
      y,
      width,
      height: h,
      stroke: '#ccc',
      strokeWidth: 1,
      cornerRadius: 4
    })

    return group_rect
  }

  setTime(time?: number) {
    this.time = time ? time : ++this.time
  }

  insert(name: string, params: any) {
    try {
      this.pluginList.forEach((item) => {
        if (item.getName() === name) {
          const plugin = new item(this, params)
          const list = plugin.render()
          this.queue.push(list)
        }
      })
    } catch (err) {
      console.log(err)
      throw new Error(`插件 ${name} 找不到`)
    }
  }

  blockStart() {
    this.block_Rect = this.drawBigGroup()
    this.queue.push([{ name: 'block', value: this.block_Rect }])
    this.block = true
    // 添加一个坐标点
    this.addGroupPoint({
      kind: 'block',
      value: {
        x1: this.block_Rect.x(),
        y1: this.block_Rect.y(),
        x2: this.block_Rect.x() + this.block_Rect.width(),
        y2: this.block_Rect.y() + 10
      }
    })
  }

  blockAddText(text: string) {
    const group_list = this.block_group.children || []

    let y = this.block_Rect.y() + 30

    if (group_list.length > 0) {
      const last = group_list[group_list.length - 1]
      y = last.y() + 30
    }

    if (y > this.block_Rect.height() - 20) {
      this.block_Rect.height(y)
    }

    const Text = new Konva.Text({
      x: 30,
      y,
      text: text,
      fontSize: 16,
      fontFamily: 'Calibri',
      fill: '#555',
      padding: 10,
      align: 'center'
    })
    this.block_group.add(Text)
    this.queue.push([{ name: 'text', value: Text }])
  }

  blockEnd() {
    this.addGroupPoint({
      kind: 'block',
      value: {
        x1: this.block_Rect.x(),
        y1: this.block_Rect.y(),
        x2: this.block_Rect.x() + this.block_Rect.width(),
        y2: this.block_Rect.y() + this.block_Rect.height()
      }
    })
    this.block = false
  }

  render(timer: number = 1000) {
    // 遍历队列
    this.queue.forEach((item) => {
      // 遍历队列中的每一项
      item.forEach((shape: QueueInterface) => {
        const time = this.time
        // 一个一个渲染
        setTimeout(() => {
          this.layer.add(shape.value)
          this.layer.draw()

          // 这里主要是为了计算画布的高度 当元素要超出画布的时候，就要增加画布的高度 而且滚动到最新的位置
          if (shape.value.x() + shape.value.height() > this.stage.height()) {
            this.stage.height(shape.value.x() + shape.value.height() + 20)
            this.el.style.overflowY = 'scroll'
            this.el.style.overflowX = 'hidden'
            // TODO: 滚动到最新的位置
            // this.el.scrollTop += 10
          }
          // const options = this.animation_group.find((item) => item.kind === shape.name)?.value || {}
          const options = shape?.options || {}
          requestAnimationFrame(() => {
            // 执行动画
            this.animation(shape.value, options)
          })
          // }
        }, time * timer)
        // 每次渲染完毕后，时间 + 1
        this.setTime()
      })
    })
  }

  animation(shape: QueueInterface, options: any = {}) {
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
