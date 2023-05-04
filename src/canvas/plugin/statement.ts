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
  /**
   * 整体组
   */
  big_group: Konva.Group = new Konva.Group()

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
      x: this.big_group_rect.x() + 30,
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
  drawGroup(item: { name: string; value: any }) {
    if (this.group_list.length > 0) {
      const { x2 } = this.group_list[this.group_list.length - 1]
      this.min_x = x2 + 40
      // 如果 x 坐标超出画布宽度, 则换行
      if (this.min_x + 100 > this.draw.stage.width()) {
        this.y += 60
        this.min_x = this.big_group_rect.x() + 50
        this.big_group_rect?.height(this.big_group_rect.height() + 60)
      }
    }

    // 绘制小组变量
    const min_group_text = new Konva.Text({
      x: this.min_x - 20,
      y: this.y + 20,
      text: item.name,
      fontSize: 20,
      fontFamily: 'Calibri',
      fill: 'orange'
    })

    // 计算变量初始值的宽度
    const min_group_text_value_width = new Konva.Text({
      text: !item.value && item.value !== 0 ? 'NULL' : item.value,
      fontSize: 16,
      fontFamily: 'Calibri',
      fill: 'transparent'
    }).width()

    // 绘制小组, 变量声明的每个变量都是一个小组
    const min_group_rect = new Konva.Rect({
      x: this.min_x + min_group_text.width() - 10,
      y: this.y + 10,
      width: 100,
      height: 40,
      strokeWidth: 1,
      cornerRadius: 4,
      fill: 'orange'
    })

    // 变量初始值
    const min_group_text_value = new Konva.Text({
      // 要求 x 坐标必须在画布内,文字居中
      x: min_group_rect.x() + (min_group_rect.width() - min_group_text_value_width) / 2,
      y: this.y + 23,
      text: !item.value && item.value !== 0 ? 'NULL' : item.value,
      fontSize: 16,
      fontFamily: 'Calibri',
      fill: '#fff'
    })
    if (min_group_text_value_width >= 100) {
      min_group_rect.width(min_group_text_value_width + 40)
    }
    // 添加到坐标组
    this.group_list.push({
      x1: min_group_rect.x(),
      y1: min_group_rect.y(),
      x2: min_group_rect.x() + min_group_rect.width(),
      y2: min_group_rect.y() + min_group_rect.height()
    })

    return {
      min_group_rect,
      min_group_text,
      min_group_text_value
    }
  }

  render() {
    this.min_x = this.big_group_rect.x() + this.big_group_text.width() + 80
    // 绘制所有变量小块
    this.params.body.map((v) => {
      const { min_group_rect, min_group_text, min_group_text_value } = this.drawGroup(v)
      this.min_group.add(min_group_text)
      this.min_group.add(min_group_rect)
      this.min_group.add(min_group_text_value)
    })

    // 添加坐标到坐标组
    this.draw.addGroupPoint({
      kind: 'statement',
      value: {
        x1: this.big_group_rect.x(),
        y1: this.big_group_rect.y(),
        x2: this.big_group_rect.x() + this.big_group_rect.width(),
        y2: this.big_group_rect.y() + this.big_group_rect.height()
      }
    })

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
