import { DrawInterface, ListInterface, ExpressionOptionsInterface } from '$/types'
import { AssignmentExpressionInterface } from '$/types/plugin'
import Konva from 'konva'
import { Plugin } from '$/index'

class AssignmentExpression extends Plugin {
  draw: DrawInterface
  params: AssignmentExpressionInterface

  // 组列表
  group: Konva.Group = new Konva.Group({
    name: 'AssignmentExpression'
  })

  // 统一水平线
  y: number = 8

  constructor(draw: DrawInterface, params: AssignmentExpressionInterface) {
    super()
    this.params = params
    this.draw = draw
  }

  static getName() {
    return 'AssignmentExpression'
  }

  drawRect(textContent: string) {
    const left_shape = this.group.children?.at(-1) as Konva.Group
    const shape_x = left_shape?.x() || 0
    const shape_w = left_shape?.width() || 0
    console.log('left_shape', left_shape)

    const x = shape_x + shape_w

    const group = new Konva.Group({
      x,
      y: this.y
    })

    // 获取文本的宽度
    const text_width = new Konva.Text({ text: textContent, fontSize: 16 }).width()

    // 绘制矩形
    const rect = new Konva.Rect({
      width: text_width + 40,
      height: 40,
      fill: 'orange',
      x: 0,
      y: 0,
      cornerRadius: 3
    })

    const text = new Konva.Text({
      text: textContent,
      fontSize: 16,
      fill: '#fff',
      x: rect.x() + rect.width() / 2 - 5,
      y: rect.y() + rect.height() / 2 - 8
    })

    group.add(rect, text)
    group.width(rect.width())

    this.group.add(group)
  }

  drawOperator(operator: string) {
    const left_shape = this.group.children?.at(-1) as Konva.Group
    const shape_x = left_shape?.x() || 0
    const shape_w = left_shape?.width() || 0
    const x = shape_x + shape_w + 30

    const group = new Konva.Group({
      x,
      y: this.y
    })

    const textOption = new Konva.Text({ text: operator, fontSize: 16 })

    const circle = new Konva.Circle({
      radius: 20,
      fill: '#f36',
      x: 0,
      y: 20
    })

    const text = new Konva.Text({
      text: operator,
      fontSize: 14,
      fill: '#fff',
      x: circle.x() - textOption.width() / 2,
      y: 20 - textOption.height() / 2
    })
    group.add(circle, text)
    group.width(circle.width())
    this.group.add(group)
  }

  /**
   * 绘制变量声明动画
   * @param item  变量声明的每个变量
   * @param value 变量声明的每个变量的值
   * @returns
   */
  drawGroup() {
    const { left, right, result } = this.params

    this.group.add(
      new Konva.Rect({
        width: this.draw?.width - 20,
        height: 60,
        stroke: '#ccc',
        strokeWidth: 1,
        cornerRadius: 3,
        x: 10
      })
    )

    const right_text = right.map((v) => v.name).join(' ')

    const group = new Konva.Group({
      x: 10,
      y: this.y
    })

    const text = new Konva.Text({
      text: `${left} = ${right_text}`,
      fontSize: 16,
      fill: '#000',
      x: 20,
      y: 20
    })

    // 绘制箭头
    const arrow = new Konva.Arrow({
      points: [
        text.x() + text.width() + 10,
        text.y() + text.height() / 2,
        text.x() + text.width() + 60,
        text.y() + text.height() / 2
      ],
      pointerLength: 8,
      pointerWidth: 5,
      fill: 'orange',
      stroke: 'orange',
      strokeWidth: 2
    })

    group.add(text, arrow)

    group.width(text.width() + arrow.width() + 30)

    this.group.add(group)

    // // 循环右边参数
    right.forEach((v, i) => {
      // 绘制矩形
      if (v.type === 'operator') {
        this.drawOperator(v.name)
      } else {
        this.drawRect(v.name)
      }
    })

    this.drawOperator('=')
    this.drawRect(result)

    this.group.add(text, arrow)

    // 设置组的位置
    this.group.x(10)
    this.group.y(10)

    // 给组添加类名
    this.group.className = 'AssignmentExpression'
  }

  render() {
    this.drawGroup()

    return [
      // @ts-ignore
      ...this.group.children.map((v) => {
        return { name: v?.className || '', value: v }
      })
    ]
  }
}

export default AssignmentExpression
