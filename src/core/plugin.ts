import type { PluginInterface, RenderInterface } from '~/types/plugin'
import type { DrawInterface } from '~/types/draw'

abstract class Plugin implements PluginInterface {
  draw: DrawInterface

  constructor(draw: DrawInterface) {
    this.draw = draw
  }

  ['constructor']() {
    throw new Error('Method not implemented.')
  }

  // static get pluginName() {
  //   return ''
  // }

  render() {
    return []
  }
}

class P extends Plugin implements PluginInterface {
  static get pluginName() {
    return 'p'
  }

  render() {
    return []
  }
}

const a = {}
const test = new P(a as DrawInterface)

// Plugin.pluginName

export default Plugin
