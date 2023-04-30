import { DrawInterface, RenderInterface } from '$/types/index'

export interface PluginInterface {
  draw: DrawInterface
  params: any
  getName: () => string
  render: () => Array<RenderInterface>
}

/**
 * 插件必须继承的抽象类
 * @abstract
 * @class Plugin
 * @example
 * class Plugin extends Plugin {
 *  draw: DrawInterface
 *  params: any
 *  constructor(draw: DrawInterface, params: any) {
 *      super()
 *      this.draw = draw
 *      this.params = params
 *  }
 *  getName() {
 *      return 'Plugin'
 *  }
 *  render() {
 *      return []
 *  }
 * }
 */
abstract class Plugin implements PluginInterface {
  /**
   * 画布实例
   * @abstract
   * @type {DrawInterface}
   */
  abstract draw: DrawInterface
  /**
   * 插件参数
   * @abstract
   * @type {any}
   */
  abstract params: any
  /**
   * 插件名称
   * @abstract
   * @returns {string}
   */
  abstract getName(): string
  /**
   * 注册插件 会在画布初始化的时候调用
   * @param draw  画布实例
   * @example
   */
  abstract render(): Array<RenderInterface>
}

export default Plugin
