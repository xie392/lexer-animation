import Konva from 'konva'
import { DrawInterface, ListInterface } from '$/types/index'

interface OptionsInterface {
  name: string
  value: any
}

/**
 * 绘制变量声明动画
 * @param draw   画布实例
 * @param options 画布上的图形列表内容
 */
export const useStatement = (
  draw: DrawInterface,
  options: { kind: string; body: Array<OptionsInterface> }
) => {
  const { kind, body: optionsList } = options
  const { stage, layer, time } = draw

  const min_group = new Konva.Group({
    draggable: false
  })

  // 绘制一个组
  const big_group_rect = draw.drawBigGroup()

  // const tween = new Konva.Tween({
  //   node: big_group_rect,
  //   duration: 1,
  //   opacity: 1,
  //   stroke: '#f36'
  // })

  // tween.play()

  let { y } = big_group_rect.getPosition()

  // 绘制大组变量声明
  const big_group_text = new Konva.Text({
    x: 30,
    y: y + 21,
    text: kind,
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: '#555'
  })

  let min_x = big_group_text.width() + 80
  const group_list: Array<ListInterface> = []

  // 绘制大组里面的小块组
  const drawGroup = (item: OptionsInterface) => {
    if (group_list.length > 0) {
      const { x2 } = group_list[group_list.length - 1]
      min_x = x2 + 40
      // 如果 x 坐标超出画布宽度, 则换行
      if (min_x + 100 > stage.width()) {
        y += 60
        min_x = 100
        big_group_rect.height(big_group_rect.height() + 60)
      }
    }

    // 绘制小组变量
    const min_group_text = new Konva.Text({
      x: min_x - 20,
      y: y + 20,
      text: item.name,
      fontSize: 20,
      fontFamily: 'Calibri',
      fill: '#f36'
    })

    // 计算变量初始值的宽度
    const min_group_text_value_width = new Konva.Text({
      text: item.value || 'NULL',
      fontSize: 16,
      fontFamily: 'Calibri',
      fill: 'transparent'
    }).width()

    // 绘制小组, 变量声明的每个变量都是一个小组
    const min_group_rect = new Konva.Rect({
      x: min_x + min_group_text.width() - 10,
      y: y + 10,
      width: 100,
      height: 40,
      strokeWidth: 1,
      cornerRadius: 4,
      fill: '#f36'
    })

    // 变量初始值
    const min_group_text_value = new Konva.Text({
      // 要求 x 坐标必须在画布内,文字居中
      x: min_group_rect.x() + (min_group_rect.width() - min_group_text_value_width) / 2,
      y: y + 23,
      text: item.value || 'NULL',
      fontSize: 16,
      fontFamily: 'Calibri',
      fill: '#ccc'
    })
    if (min_group_text_value_width >= 100) {
      min_group_rect.width(min_group_text_value_width + 40)
    }
    // 添加到坐标组
    group_list.push({
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

  // 绘制所有变量小块
  optionsList.map((v) => {
    // ;(function (v, i) {
    // draw.setTime()
    // setTimeout(() => {
    const { min_group_rect, min_group_text, min_group_text_value } = drawGroup(v)
    min_group.add(min_group_rect)
    min_group.add(min_group_text)
    min_group.add(min_group_text_value)
    // layer.add(min_group)
    // }, (i + 1) * 1000)
    // })(v, i)
  })

  // 添加坐标到坐标组
  draw.addGroupPoint({
    kind: 'statement',
    value: {
      x1: big_group_rect.x(),
      y1: big_group_rect.y(),
      x2: big_group_rect.x() + big_group_rect.width(),
      y2: big_group_rect.y() + big_group_rect.height()
    }
  })

  // layer.add(big_group_text)
  // layer.draw()

  // 恢复
  // setTimeout(() => {
  //   tween.reverse()
  // }, time * 1000)

  return {
    big_group_rect,
    big_group_text,
    min_group
  }
}
