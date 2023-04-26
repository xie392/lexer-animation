import Konva from 'konva'
import { DrawInterface, ListInterface } from '$/types/index'

interface OptionsInterface {
  left: string
  right: string
  operator: string
  result: string
}

/**
 * 声明表达式
 * @param draw  画布实例
 * @param options   画布上的图形列表内容
 */
const useExpression = (draw: DrawInterface, options: OptionsInterface) => {
  const { left, right, operator, result } = options
  const { stage, layer, time } = draw

  const min_group = new Konva.Group({
    draggable: false
  })

  const big_group_rect = draw.drawBigGroup()

  // const tween = new Konva.Tween({
  //   node: big_group_rect,
  //   duration: 1,
  //   opacity: 1,
  //   stroke: '#f36'
  // })
  // setTimeout(() => tween.play(), time * 1000)

  let { y } = big_group_rect.getPosition()

  // 绘制大组表达式
  const big_group_text = new Konva.Text({
    x: 30,
    y: y + 21,
    text: `${left} ${operator} ${right}`,
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: '#555'
  })

  const group_list: Array<ListInterface> = []

  const drawGroup = (item: string, flag: boolean = false) => {
    const point = group_list[group_list.length - 1]

    let x1: number = big_group_text.width() + 50

    if (point) {
      x1 = point.x2 + 10
    }

    // 如果 x 坐标超出画布宽度, 则换行
    if (x1 + 100 > stage.width()) {
      y += 60
      x1 = 100
      big_group_rect.height(big_group_rect.height() + 60)
    }

    const min_group_shap = new Konva.Rect({
      x: x1,
      y: y + 10,
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
      y: y + 20,
      text: item,
      fontSize: 20,
      fontFamily: 'Calibri',
      fill: '#fff'
    })

    group_list.push({
      x1: min_group_shap.x(),
      y1: min_group_shap.y(),
      x2: min_group_shap.x() + min_group_shap.width(),
      y2: min_group_shap.y() + min_group_shap.height()
    })

    min_group.add(min_group_shap)
    min_group.add(min_group_text)
  }

  drawGroup(left)
  drawGroup(operator, true)
  drawGroup(right)
  drawGroup('=', true)
  drawGroup(result)

  layer.add(big_group_text)
  layer.add(min_group)
  layer.draw()

  // 添加坐标到坐标组
  draw.addGroupPoint({
    kind: 'expression',
    value: {
      x1: big_group_rect.x(),
      y1: big_group_rect.y(),
      x2: big_group_rect.x() + big_group_rect.width(),
      y2: big_group_rect.y() + big_group_rect.height()
    }
  })

  // 恢复
  // setTimeout(() => {
  //   tween.reverse()
  // }, time * 1000)
}

export { useExpression }
