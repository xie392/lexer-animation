import Konva from 'konva'
import {
  DrawOptionsInterface,
  DrawInterface,
  PointListInterface,
  QueueInterface,
  StatementOptionsInterface,
  ExpressionOptionsInterface,
  AnimationGroupInterface
} from '$/types/index'
import { useStatement } from '@/canvas/plugin/useStatement'
import { useExpression } from '@/canvas/plugin/useExpression'

// 默认动画组
const default_animation_group: Array<AnimationGroupInterface> = []

class Draw implements DrawInterface {
  id: string
  width: number
  height: number

  stage: Konva.Stage
  layer: Konva.Layer = new Konva.Layer()
  group: Konva.Group = new Konva.Group()
  group_point: Array<PointListInterface> = []

  time: number = 0
  queue: Array<{ [key: string]: QueueInterface }> = []
  animation_group: Array<AnimationGroupInterface> = default_animation_group

  isIf: boolean = false

  pluginList: any[] = []
  fnList: Array<Function> = []

  constructor(options: DrawOptionsInterface, pluginList: any[] = []) {
    this.id = options.id
    if (!this.id) throw new Error('id 找不到')
    const el = document.getElementById(options.id)
    if (!el) throw new Error('找不到画布元素')
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

  add(...konvaList: Konva.Shape[]) {
    this.layer.add(...konvaList)
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

    const group_rect = new Konva.Rect({
      x: 10,
      y: this.isIf ? 10 : y,
      width: this.stage.width() - 20,
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

  addStatement(options: StatementOptionsInterface) {
    const statement = useStatement(this, options)
    this.queue.push(statement)
  }

  addExpression(options: ExpressionOptionsInterface) {
    const expression = useExpression(this, options)
    this.queue.push(expression)
  }

  addFunction() {}

  render() {
    // 遍历队列
    this.queue.forEach((item) => {
      // 遍历队列中的每一项
      item.forEach((shape: QueueInterface) => {
        const time = this.time
        // 一个一个渲染
        setTimeout(() => {
          this.layer.add(shape.value)
          this.layer.draw()
          const options = this.animation_group.find((item) => item.kind === shape.name)?.value || {}
          requestAnimationFrame(() => {
            // 执行动画
            this.animation(shape.value, options)
          })
          // }
        }, time * 1000)
        // 每次渲染完毕后，时间 + 1
        this.setTime()
      })
    })
  }

  animation(shape: QueueInterface, options: any = {}) {
    const t1 = new Konva.Tween({
      node: shape,
      duration: 0.5,
      opacity: 1,
      y: shape.y() + 15,
      ...options
    })

    t1.play()

    // setTimeout(() => {
    //   t1.reverse()
    // }, this.time * 1000)

    return t1
  }

  destroy() {
    this.layer?.destroy()
    this.stage?.destroy()
  }
}

export default Draw
