import { StatementOptionsInterface, DrawInterface, ListInterface } from '$/types'
import Konva from 'konva'
import { Plugin } from '$/index'

class Statement extends Plugin {
  /**
   * 画布实例
   */
  draw: DrawInterface
  /**
   * 插件参数
   */
  params: StatementOptionsInterface
  /**
   * 外框
   */
  big_group_rect: Konva.Rect
  /**
   * 外框的文本
   */
  big_group_text: Konva.Text

  /**
   * 外框的 y 坐标
   */
  y: number = 0
  /**
   * 组列表
   */
  group_list: Array<ListInterface> = []
  /**
   * 最小 x 坐标 主要作用在于多个变量声明时, 换行或者向右移动
   */
  min_x: number = 0
  /**
   * 最小组
   */
  min_group: Konva.Group = new Konva.Group()

  constructor(draw: DrawInterface, params: StatementOptionsInterface) {
    super()
    this.params = params
    this.draw = draw

    // 绘制外框
    this.big_group_rect = draw.drawBigGroup()

    // 获取外框的 y 坐标
    const { y } = this.big_group_rect.getPosition()
    this.y = y

    // 绘制大组变量声明
    this.big_group_text = new Konva.Text({
      x: 30,
      y: y + 21,
      text: params.kind,
      fontSize: 20,
      fontFamily: 'Calibri',
      fill: '#555'
    })
  }

  static getName() {
    return 'Statement'
  }

  /**
   * 绘制变量声明动画
   * @param item  变量声明的每个变量
   * @param value 变量声明的每个变量的值
   * @returns
   */
  drawGroup(item: { name: string; value: any }) {}

  render() {
    return [
      { name: 'Rect', value: this.big_group_rect },
      { name: 'Text', value: this.big_group_text },
      // @ts-ignore
      ...this.min_group.children.map((v) => {
        return { name: v?.className || '', value: v }
      })
    ]
  }
}

export default Statement
