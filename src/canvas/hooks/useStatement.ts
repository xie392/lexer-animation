import konva from 'konva'
import type { DrawInterface, PointInterface } from '#/canvas'

export const useStatement = (Draw: DrawInterface, options: { name: string; value: any }) => {
  const { name, value } = options
  let point: PointInterface

  // 初始矩形坐标
  //   let x = 0
  //   let y = 0

  let minX = 0,
    maxX = 0,
    minY = 0,
    maxY = 0

  // 绘制变量块
  const drawStatement = () => {
    const rect = Draw.drawRect(100, 50, { fill: 'orange' })

    minX = rect.x()
    minY = rect.y()
    maxX = maxX + rect.width()
    maxY = minY + rect.height()

    // 添加坐标 左右的坐标
    point = {
      minX,
      maxX,
      minY,
      maxY: maxY + 15
    }
    Draw.addPoint(point)

    setTimeout(() => requestAnimationFrame(drawStatementName), 1000)
  }

  // 绘制变量名
  const drawStatementName = () => {
    // 计算坐标，使其保持在变量块下方居中
    const textName = Draw.drawText(minX + 10, maxY + 10, name, { fill: '#333', fontSize: 20 })
    const width = maxX - minX
    const setp = Math.ceil((width - textName.width()) / 2)
    // textName.offsetX(setp)
    // console.log('textName.width()', textName, textName?.getAlign())
    // 设置 x 轴偏移
    textName?.offsetX(setp)
    // textName?.setAlign('center')

    setTimeout(() => requestAnimationFrame(drawStatementValue), 1000)
  }

  // 绘制初始值
  const drawStatementValue = () => {
    // 要求始终文字在于居中
    Draw.drawText(20, 120, value, { fill: '#fff', fontSize: 20 })
    Draw.run()
    // Draw.addPoint(point)

    console.log('Draw', Draw.point)
  }

  setTimeout(() => requestAnimationFrame(drawStatement), 1000)
}
