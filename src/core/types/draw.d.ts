import Konva from 'konva'
import type { PluginListInterface } from '~/types/plugin'

/**
 * @description: 绘制类型
 * @param {DrawInterface}
 */
export abstract class DrawInterface {
  /**
   * @description: 画布 id
   * @param {string}
   */
  id: string
  /**
   * @description: 画布宽度
   * @param {number}
   * @default {300}
   */
  width?: number
  /**
   * @description: 画布高度
   * @param {number}
   * @default {150}
   */
  height?: number
  /**
   * @description: 画布元素
   * @param {HTMLDivElement}
   */
  el: HTMLDivElement
  /**
   * @description: 画布舞台
   * @param {Konva.Stage}
   */
  stage: Konva.Stage
  /**
   * @description: 画布图层
   * @param {Konva.Layer}
   */
  layer: Konva.Layer
  /**
   * @description: 组
   * @param {Konva.Group}
   */
  /**
   * @description: 是否是块元素
   * @type {boolean}
   */
  block: boolean
  /**
   * @description: 获取组中子元素的最后一个元素
   * @returns {GroupInterface}
   */
  getGroupEnd(): GroupInterface
}

/**
 * @description: 动画组成员类型
 * @param {Konva.Group}
 */
export type GroupInterface =
  | Konva.Text
  | Konva.Rect
  | Konva.Circle
  | Konva.Group
  | Konva.Shape
  | Konva.Line
  | Konva.Image
  | Konva.Star
  | Konva.Tag
  | Konva.TextPath
  | Konva.Wedge
  | Konva.Arc
  | Konva.Ellipse
  | Konva.RegularPolygon
  | Konva.Path
  | Konva.Sprite
  | Konva.Label
  | Konva.Arrow
  | Konva.Ring
  | Konva.Shape

/**
 * @description: 实例化绘制类时需要传入的参数
 * @type {DrawOptionsInterface}
 */
export interface DrawOptionsInterface {
  /**
   * @description: 画布 id
   * @type {string}
   */
  id: string
  /**
   * @description: 画布宽度
   * @param {number}
   * @default {300}
   */
  width?: number
  /**
   * @description: 画布高度
   * @param {number}
   * @default {150}
   */
  height?: number
  /**
   * @description: 插件列表
   * @type {PluginListInterface}
   */
  plugin: PluginListInterface[]
}
