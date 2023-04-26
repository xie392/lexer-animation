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
import { useStatement } from '$/hooks/useStatement'
import { useExpression } from '$/hooks/useExpression'

const animation_group: Array<AnimationGroupInterface> = [
  {
    kind: 'big_group_rect',
    value: {
      stroke: '#f36'
    }
  },
  {
    kind: 'big_group_text',
    value: {
      fill: '#f36'
    }
  }
]

class Draw implements DrawInterface {
  id: string
  width: number
  height: number

  stage: Konva.Stage
  layer: Konva.Layer = new Konva.Layer()
  group: Konva.Group = new Konva.Group()
  group_point: Array<PointListInterface> = animation_group

  time: number = 0
  queue: Array<{ [key: string]: QueueInterface }> = []
  animation_group: Array<AnimationGroupInterface> = []

  constructor(options: DrawOptionsInterface) {
    this.id = options.id
    if (!this.id) throw new Error('id 找不到')
    const el = document.getElementById(options.id)
    if (!el) throw new Error('找不到画布元素')
    this.width = options.width || el.offsetWidth || 300
    this.height = options.height || el.offsetHeight || 150
    this.stage = this.init()
    this.stage.add(this.layer)
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

  drawBigGroup() {
    const group = this.getGroupEnd()

    const y2 = group?.value?.y2
    const y = y2 ? y2 + 10 : 10

    const group_rect = new Konva.Rect({
      x: 10,
      y,
      width: this.stage.width() - 20,
      height: 60,
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

  render() {
    this.queue.forEach((item) => {
      // 取出队列中的每一项
      for (const key in item) {
        const time = this.time
        ;(() => {
          setTimeout(() => {
            this.layer.add(item[key])
            this.layer.add(this.group)
            this.layer.draw()
            const options = key === 'big_group_rect' ? { stroke: '#f36' } : { fill: 'orange' }
            requestAnimationFrame(() => {
              this.animation(item[key], options)
            })
          }, time * 1000)
          // 每次渲染完毕后，时间 + 1
          this.setTime()
        })()
      }
    })
  }

  animation(shape: QueueInterface, options: any = {}) {
    const t1 = new Konva.Tween({
      node: shape,
      duration: 1,
      opacity: 1,
      ...options
    })
    t1.play()

    setTimeout(() => {
      t1.reverse()
    }, this.time * 1000)

    return t1
  }

  destroy() {
    this.layer?.destroy()
    this.stage?.destroy()
  }
}

export default Draw

// const t1 = new Konva.Tween({
//   node: min_group_text,
//   duration: 1,
//   opacity: 1,
//   fill: 'orange'
// })

// const t2 = new Konva.Tween({
//   node: min_group_rect,
//   duration: 1,
//   opacity: 1,
//   fill: 'orange'
// })

// const t3 = new Konva.Tween({
//   node: min_group_text_value,
//   duration: 1,
//   opacity: 1,
//   fill: '#fff'
// })

// t1.play()
// t2.play()
// t3.play()
