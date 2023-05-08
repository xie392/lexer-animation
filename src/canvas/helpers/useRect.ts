import Konva from 'konva'

import { RectConfig } from 'konva/lib/shapes/Rect'

/**
 * 绘制变量矩形
 * @param textContent 文本内容
 */
export function useRect(textContent: string, options: RectConfig) {
  const text_width = new Konva.Text({ text: textContent, fontSize: 16 })

  const rect = new Konva.Rect({
    ...options
  })
}
