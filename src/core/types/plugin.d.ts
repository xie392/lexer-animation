import type { DrawInterface } from '~/types/draw'

/**
 * @description: 插件类型
 * @type {pluginInterface}
 */
export abstract class PluginInterface {
  /**
   * @description: 绘制类
   * @param {DrawInterface}
   */
  draw: DrawInterface
  /**
   * @description: 参数
   * @param {any}
   */
  options: any
  /**
   * @description: 插件名字
   * @returns {string}
   */
  static readonly pluginName: string

  constructor(draw: DrawInterface, options: any)

  abstract render(): RenderInterface[]
}

/**
 * @description: 插件列表类型
 * @type {pluginInterface}
 */
export type PluginListInterface = any

/**
 * @description: render 函数返回值类型
 * @interface RenderInterface
 */
export interface RenderInterface {
  /**
   * 插件名字
   * @param {string} name
   */
  name: string
  /**
   * 图形类别
   * @param {QueueInterface} value
   */
  value: any
  /**
   * 动画参数
   * @param {any} options
   */
  options?: {
    [key: string]: any
  }
}
