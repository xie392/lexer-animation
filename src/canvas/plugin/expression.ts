import { DrawInterface, ListInterface, ExpressionOptionsInterface } from '$/types'
import Konva from 'konva'
import { Plugin } from '$/index'

class Expression extends Plugin {
  /**
   * 画布实例
   */
  draw: DrawInterface
  /**
   * 插件参数
   */
  params: ExpressionOptionsInterface
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
  // min_x: number = 0
  /**
   * 最小组
   */
  min_group: Konva.Group = new Konva.Group()
  /**
   * 整体组
   */
  big_group: Konva.Group = new Konva.Group()

  constructor(draw: DrawInterface, params: ExpressionOptionsInterface) {
    super()
    this.params = params
    this.draw = draw

    // 绘制外框
    this.big_group_rect = draw.drawBigGroup()

    // 获取外框的 y 坐标
    const { y } = this.big_group_rect.getPosition()
    this.y = y

    const { left, right, operator } = params

    // 绘制大组变量声明
    this.big_group_text = new Konva.Text({
      x: this.big_group_rect.x() + 30,
      y: y + 21,
      text: `${left} ${operator} ${right}`,
      fontSize: 20,
      fontFamily: 'Calibri',
      fill: '#555'
    })
  }

  static getName() {
    return 'Expression'
  }

  /**
   * 绘制变量声明动画
   * @param item  变量声明的每个变量
   * @param value 变量声明的每个变量的值
   * @returns
   */
  drawGroup(item: string, flag: boolean = false) {
    const point = this.group_list[this.group_list.length - 1]

    let x1: number = this.big_group_rect.x() + this.big_group_text.width() + 50

    // 如果存在上一个坐标点, 则 x 坐标为上一个坐标点的 x 坐标 + 10
    if (point) {
      x1 = point.x2 + 10
    }

    // 如果 x 坐标超出画布宽度, 则换行
    if (x1 + 100 > this.draw.stage.width()) {
      this.y += 60
      x1 = this.big_group_rect.x() + 50
      this.big_group_rect.height(this.big_group_rect.height() + 60)
    }

    const min_group_shap = new Konva.Rect({
      x: x1,
      y: this.y + 10,
      width: flag ? 40 : 100,
      height: 40,
      fill: flag ? '#f36' : 'orange',
      strokeWidth: 1,
      cornerRadius: flag ? 50 : 4
    })

    // 计算变量初始值的宽度
    const min_group_text_value_width = new Konva.Text({
      text: item || 'NULL',
      fontSize: 20,
      fontFamily: 'Calibri',
      fill: 'transparent'
    }).width()

    const min_group_text = new Konva.Text({
      x: min_group_shap.x() + (min_group_shap.width() - min_group_text_value_width) / 2,
      y: this.y + 20,
      text: item,
      fontSize: 20,
      fontFamily: 'Calibri',
      fill: '#fff'
    })

    this.group_list.push({
      x1: min_group_shap.x(),
      y1: min_group_shap.y(),
      x2: min_group_shap.x() + min_group_shap.width(),
      y2: min_group_shap.y() + min_group_shap.height()
    })

    this.min_group.add(min_group_shap)
    this.min_group.add(min_group_text)
  }

  render() {
    // this.min_x = this.big_group_text.width() + 80

    const { left, right, operator, result } = this.params

    // 处理层级关系
    // this.drawGroup(left as string)
    // this.drawGroup(operator, true)
    // this.drawGroup(right as string)
    // this.drawGroup('->', true)
    // this.drawGroup(result)

    // 添加坐标到坐标组
    this.draw.addGroupPoint({
      kind: 'expression',
      value: {
        x1: this.big_group_rect.x(),
        y1: this.big_group_rect.y(),
        x2: this.big_group_rect.x() + this.big_group_rect.width(),
        y2: this.big_group_rect.y() + this.big_group_rect.height()
      }
    })

    this.big_group.add(this.big_group_rect)
    this.big_group.add(this.big_group_text)
    this.big_group.add(this.min_group)

    // 缩小
    // this.big_group.scale({ x: 0.5, y: 0.5 })

    // console.log(this.big_group,this.min_group.children)

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


export default Expression
