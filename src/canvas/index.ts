import Konva from 'konva'
import {
  DrawOptionsInterface,
  DrawInterface,
  PointListInterface,
  ListInterface
} from '$/types/index'
import { useStatement } from '$/hooks/useStatement'

interface OptionsInterface {
  name: string
  value: any
}

class Draw implements DrawInterface {
  id: string
  width: number
  height: number

  stage: Konva.Stage
  layer: Konva.Layer = new Konva.Layer()
  group: Konva.Group = new Konva.Group()
  group_point: Array<PointListInterface> = []

  time: number = 1

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

    this.group.add(group_rect)
    // this.layer.add(this.group)

    return group_rect
  }

  setTime(time?: number) {
    this.time = time ? time : ++this.time
  }

  addStatement(options: { kind: string; body: Array<OptionsInterface> }) {
    useStatement(this, options)
  }
}

export default Draw
