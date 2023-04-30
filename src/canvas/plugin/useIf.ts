import Konva from 'konva'
import { DrawInterface } from '$/types/index'

/**
 * 绘制变量声明动画
 * @param draw   画布实例
 * @param options 画布上的图形列表内容
 */
export const useIf = (draw: DrawInterface) => {
  //   const { stage } = draw

  // 绘制一个组
  const big_group_rect = draw.drawBigGroup()

  return [{ name: 'big_group_rect', value: big_group_rect }]
}
